/* eslint-disable react/prop-types */
import { Button, Modal, Typography, Grid, TextField, Box } from "@mui/material";
import { useEffect, useState } from "react";

import { Controller } from "react-hook-form";
import styled from "styled-components";

export default function ProductModal({
  open,
  handleClose,
  modalMode,
  handleSubmit,
  onSubmit,
  register,
  control,
  setValue,
  coverImage,
  productImages,
  handleCoverImageUpload,
  removeImageCover,
  handleImagesUpload,
  removeAllProductImages,
  brands,
  choosenProduct = null,
}) {
  useEffect(() => {
    if (choosenProduct) {
      setValue("brand", choosenProduct.brand._id);
    }
  }, [choosenProduct, setValue]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
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
            {modalMode === "create" ? "Create New Product" : "Edit Product"}
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
            defaultValue={choosenProduct ? choosenProduct.brand._id : ""}
          >
            {brands.map((brand) => (
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
                  {coverImage && <ImagePreview src={coverImage} alt="Cover" />}
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
            {modalMode === "create" ? "Create" : "Update"}
          </Button>
        </ModalContent>
      </form>
    </Modal>
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
