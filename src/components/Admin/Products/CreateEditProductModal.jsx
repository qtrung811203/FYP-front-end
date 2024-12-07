/* eslint-disable react/prop-types */
import { Button, Modal, Typography, Grid, TextField, Box } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import styled from "styled-components";

import { getBrands } from "../../../services/admin/apiAdminBrands";
import {
  createProduct,
  updateProduct,
} from "../../../services/admin/apiAdminProducts";
import LoadingModal from "../../Loading/LoadingModal";
import { formatDateSelection } from "../../../utils/formatDate";

//COMPONENT
export default function ProductModal({
  open,
  setOpen,
  choosenProduct = null,
  setChoosenProduct,
}) {
  const querryClient = useQueryClient();
  const [coverImage, setCoverImage] = useState(null);
  const [productImages, setProductImages] = useState([]);

  const { register, handleSubmit, reset, setValue, control } = useForm({
    defaultValues: {},
  });

  const { isLoading: isBrandLoading, data: brands } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  useEffect(() => {
    if (choosenProduct) {
      console.log("FILL PRODUCT");
      setCoverImage(choosenProduct.imageCover);
      setProductImages(choosenProduct.images);
      reset({
        ...choosenProduct,
        openTime: formatDateSelection(choosenProduct.openTime),
        closeTime: formatDateSelection(choosenProduct.closeTime),
        brand: choosenProduct.brand._id,
      });
    } else {
      setValue("brand", brands?.data.brands[0]._id);
    }
  }, [choosenProduct, setValue, reset, brands, setChoosenProduct]);

  // Create Product Mutation
  const { mutate: createProductMutation, isPending: isCreating } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Product created successfully");
      querryClient.invalidateQueries("products");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  // Update Product Mutation
  const { mutate: updateProductMutation, isPending: isUpdating } = useMutation({
    mutationFn: ({ slug, formData }) => updateProduct(slug, formData),
    onSuccess: () => {
      toast.success("Product updated successfully");
      querryClient.invalidateQueries("products");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleCoverImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);
      setValue("imageCover", file);
    }
  };

  const removeImageCover = () => {
    setCoverImage(null);
    setValue("imageCover", null);
  };

  const handleImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setProductImages(imageUrls);
    setValue("images", files);
  };

  const removeAllProductImages = () => {
    setProductImages([]);
    setValue("images", []);
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    // Filter fields to create or update
    const filterData = {
      name: data.name,
      brand: data.brand?._id ? data.brand._id : data.brand,
      description: data.description,
      openTime: data.openTime,
      closeTime: data.closeTime,
      imageCover: data.imageCover,
      images: data.images,
    };

    for (const key in filterData) {
      if (key === "imageCover") {
        filterData[key] instanceof Blob &&
          formData.append("imageCover", filterData[key]);
      } else if (key === "images") {
        filterData[key].forEach((image) => {
          if (image instanceof Blob) {
            formData.append("images", image);
          }
        });
      } else {
        formData.append(key, filterData[key]);
      }
    }

    console.log(choosenProduct);
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    if (!choosenProduct) {
      createProductMutation(formData);
    } else {
      updateProductMutation({ slug: choosenProduct.slug, formData });
    }
    handleCloseProductModal();
  };

  const handleCloseProductModal = () => {
    setOpen(false);
    setCoverImage(null);
    setProductImages([]);
    setChoosenProduct(null);
    resetForm();
  };

  const resetForm = () => {
    reset({
      name: "",
      brand: "",
      description: "",
      openTime: "",
      closeTime: "",
      imageCover: null,
      images: [],
    });
  };

  if (isBrandLoading) {
    return <LoadingModal isOpen={isBrandLoading} message="Loading" />;
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleCloseProductModal}
        aria-labelledby="product-modal-title"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            {/* Header */}
            <Typography
              id="product-modal-title"
              variant="h6"
              component="h2"
              gutterBottom
            >
              {!choosenProduct ? "Create New Product" : "Edit Product"}
            </Typography>
            {/* Form Fields */}
            <FormField
              {...register("name", { required: true })}
              label="Name"
              required
            />

            {/* BRAND SELECT */}
            <StyledSelect
              {...register("brand", { required: true })}
              // defaultValue={choosenProduct ? choosenProduct.brand._id : ""}
            >
              {brands.data.brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </StyledSelect>

            {/* DESCRIPTION */}
            <FormField
              {...register("description", { required: true })}
              label="Description"
              multiline
              rows={4}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormField
                  {...register("openTime")}
                  name="openTime"
                  type="date"
                  defaultValue={formatDateSelection(new Date())}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormField
                  {...register("closeTime")}
                  name="closeTime"
                  type="date"
                />
              </Grid>
            </Grid>

            {/* Cover Image */}
            <Typography variant="subtitle1">Cover Image:</Typography>
            <Controller
              name="imageCover"
              control={control}
              rules={{ required: true }}
              render={() => (
                <>
                  <input
                    accept="image/*"
                    id="cover-image-upload"
                    type="file"
                    onChange={handleCoverImageUpload}
                    style={{ display: "none" }}
                  />
                  <ImageBoxPreShow>
                    {coverImage && (
                      <ImagePreview src={coverImage} alt="Cover" />
                    )}
                    <div>
                      <label htmlFor="cover-image-upload">
                        <Button variant="contained" component="span">
                          Upload Cover Image
                        </Button>
                      </label>
                      <Button
                        component="span"
                        color="error"
                        onClick={removeImageCover}
                      >
                        Remove image
                      </Button>
                    </div>
                  </ImageBoxPreShow>
                </>
              )}
            />

            {/* Product Images */}
            <Typography variant="subtitle1">Product Images:</Typography>
            <Controller
              name="images"
              control={control}
              rules={{ required: true }}
              render={() => (
                <>
                  <input
                    accept="image/*"
                    id="images-upload"
                    type="file"
                    multiple
                    onChange={handleImagesUpload}
                    style={{ display: "none" }}
                  />
                  <ImageBoxPreShow>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        marginTop: "10px",
                      }}
                    >
                      {productImages.map((image, index) => (
                        <ImagePreview
                          key={index}
                          src={image}
                          alt={`Product ${index + 1}`}
                        />
                      ))}
                    </div>
                    <div>
                      <label htmlFor="images-upload">
                        <Button variant="contained" component="span">
                          Upload Product Images
                        </Button>
                      </label>
                      <Button
                        component="span"
                        color="error"
                        onClick={removeAllProductImages}
                      >
                        Remove all images
                      </Button>
                    </div>
                  </ImageBoxPreShow>
                </>
              )}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ float: "right" }}
            >
              {!choosenProduct ? "Create" : "Update"}
            </Button>
          </ModalContent>
        </form>
      </Modal>
      <LoadingModal isOpen={isCreating} message="Creating product..." />
      <LoadingModal isOpen={isUpdating} message="Updating product..." />
    </>
  );
}

const ModalContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  background-color: white;
  box-shadow: 24px;
  padding: 20px;
  border-radius: 8px;
`;

const FormField = styled(TextField)`
  margin: 10px 0;
  width: 100%;
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin: 5px;
`;

const ImageBoxPreShow = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

const StyledSelect = styled.select`
  font-size: var(--font-size-md);
  padding: 10px;
  width: 100%;
  border: 1px solid #c4c4c4;
  border-radius: 4px;
  background-color: white;
  color: var(--text-color);
  font-family: inherit;
  transition: border-color 0.2s;
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;
