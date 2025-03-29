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

export function CreateListing() {
  const [values, setValues] = useState({
    title: "",
    description: "",
    estimate: "",
    sale_order: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    estimate: "",
    sale_order: "",
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
    if (!values.title) newErrors.title = "Title is required";
    if (!values.description) newErrors.description = "Description is required";
    if (!values.estimate) newErrors.estimate = "Estimate is required";
    if (!values.sale_order) newErrors.sale_order = "Sale Order is required";
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      router.post("/listing", values);
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

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sale_order" className="text-right">
              Sale Order
            </Label>
            <div className="col-span-3">
              <Input
                id="sale_order"
                value={values.sale_order}
                onChange={handleChange}
                className="w-full"
                isInvalid={Boolean(errors.sale_order)}
              />
              {errors.sale_order && <span className="text-red-500 text-sm">{errors.sale_order}</span>}
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
