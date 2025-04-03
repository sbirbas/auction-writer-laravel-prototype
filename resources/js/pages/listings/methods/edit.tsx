import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface EditListingProps {
    listing: {
        id: number;
        lot: string;
        title: string;
        description: string;
        estimate: string;
        consignor: string;
    };
}

export function EditListing({ listing }: EditListingProps) {
    const [values, setValues] = useState(listing);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [saving, setSaving] = useState(false);
    const [originalValues, setOriginalValues] = useState(listing);

    useEffect(() => {
        setValues(listing);
        setOriginalValues(listing);
    }, [listing]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { id, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    }

    function validateForm() {
        const newErrors: { [key: string]: string } = {};
        if (!values.lot) newErrors.lot = 'Lot Number is required';
        if (!values.title) newErrors.title = 'Title is required';
        if (!values.description) newErrors.description = 'Description is required';
        if (!values.estimate) newErrors.estimate = 'Estimate is required';
        if (!values.consignor) newErrors.consignor = 'Consignor is required';
        return newErrors;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const formErrors = validateForm();
        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            setSaving(true); // Optimistic update(assuming request succeeds)
            toast('Saving changes...');

            try {
                await router.put(`/listing/${listing.id}`, values);
                toast.success('Listing updated successfully!');
            } catch (error) {
                toast.error('Error updating listing. Please try again.');
                setValues(originalValues); // Revert UI if failure
            } finally {
                setSaving(false);
            }
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='outline' className='text-sm sm:text-base'>
                    Edit Listing
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[500px]'>
                <DialogHeader>
                    <DialogTitle>Edit Listing</DialogTitle>
                    <DialogDescription>Update the details and save changes.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className='space-y-6 py-4'>
                    {['lot', 'title', 'description', 'estimate', 'consignor'].map((field) => (
                        <div key={field} className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor={field} className='text-right capitalize'>
                                {field.replace('_', ' ')}
                            </Label>
                            <div className='col-span-3'>
                                <Input
                                    id={field}
                                    value={values[field as keyof typeof values] || ''}
                                    onChange={handleChange}
                                    className='w-full'
                                    disabled={saving} //Disable while saving
                                />
                                {errors[field] && <span className='text-sm text-red-500'>{errors[field]}</span>}
                            </div>
                        </div>
                    ))}
                    <DialogFooter>
                        <Button type='submit' className='w-full sm:w-auto' disabled={saving}>
                            {saving ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
