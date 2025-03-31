import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function CreateListing() {
  const [values, setValues] = useState({
    lot: "",
    title: "",
    description: "",
    estimate: "",
    sale_order: "",
    consignor: "",
  });

  const [errors, setErrors] = useState({
    lot: "",
    title: "",
    description: "",
    estimate: "",
    sale_order: "",
    consignor: "",
  });

  function handleChange(e) {
    const { id, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  }

  function validateForm() {
    const newErrors = {};
    if (!values.lot) newErrors.lot = "Lot Number is required";
    if (!values.title) newErrors.title = "Title is required";
    if (!values.description) newErrors.description = "Description is required";
    if (!values.estimate) newErrors.estimate = "Estimate is required";
    if (!values.consignor) newErrors.consignor = "Consignor is required";
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      router.post("/listing", values);
      toast('Listing Created');
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-sm sm:text-base">
          Create Listing
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Listing</DialogTitle>
          <DialogDescription>
            Fill in the details below and click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lot" className="text-right">
              Lot Number
            </Label>
            <div className="col-span-3">
              <Input
                id="lot"
                value={values.lot}
                onChange={handleChange}
                className="w-full"
                isInvalid={Boolean(errors.lot)}
              />
              {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <div className="col-span-3">
              <Input
                id="title"
                value={values.title}
                onChange={handleChange}
                className="w-full"
                isInvalid={Boolean(errors.title)}
              />
              {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <div className="col-span-3">
              <Input
                id="description"
                value={values.description}
                onChange={handleChange}
                className="w-full"
                isInvalid={Boolean(errors.description)}
              />
              {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="consignor" className="text-right">
              Consignor
            </Label>
            <div className="col-span-3">
              <Input
                id="consignor"
                value={values.consignor}
                onChange={handleChange}
                className="w-full"
                isInvalid={Boolean(errors.consignor)}
              />
              {errors.sale_order && <span className="text-red-500 text-sm">{errors.sale_order}</span>}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="estimate" className="text-right">
              Estimate
            </Label>
            <div className="col-span-3">
              <Input
                id="estimate"
                value={values.estimate}
                onChange={handleChange}
                className="w-full"
                isInvalid={Boolean(errors.estimate)}
              />
              {errors.estimate && <span className="text-red-500 text-sm">{errors.estimate}</span>}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full sm:w-auto">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
