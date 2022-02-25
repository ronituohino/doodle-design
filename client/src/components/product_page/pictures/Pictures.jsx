import { Box, Paper, Modal, IconButton, Icon } from "@mui/material"
import { useState } from "react"
import { renderRow } from "./ProductPicture"

import { getFile } from "../../../utils/getFile"
import { FixedSizeList } from "react-window"

const Pictures = ({ product }) => {
  const [shownMainImage, setShownMainImage] = useState(0)
  const [imageModalOpen, setImageModalOpen] = useState(false)

  console.log(product)

  return (
    <Paper elevation={4} sx={{ display: "flex", padding: 2 }}>
      <Box sx={{ mr: 1 }}>
        <FixedSizeList
          height={330}
          width={100}
          itemSize={85}
          itemCount={product.images.length}
          overscanCount={1}
          itemData={{
            product,
            shownMainImage,
            setShownMainImage,
            setImageModalOpen,
          }}
        >
          {renderRow}
        </FixedSizeList>
      </Box>

      <Box>
        <img
          alt="big preview"
          component="img"
          src={getFile(
            product.images[shownMainImage]._id,
            product.images[shownMainImage].filename
          )}
          style={{
            width: "330px",
            height: "330px",
            borderRadius: 4,
            cursor: "pointer",
          }}
          onClick={() => setImageModalOpen(true)}
        />
      </Box>

      <Modal
        open={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
      >
        <Paper
          sx={{
            width: "560px",
            height: "560px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box sx={{ alignSelf: "center" }}>
            <img
              alt="big preview"
              component="img"
              src={getFile(
                product.images[shownMainImage]._id,
                product.images[shownMainImage].filename
              )}
              style={{
                width: "500px",
                height: "500px",
                borderRadius: 4,
              }}
            />
          </Box>
          <IconButton
            sx={{
              position: "absolute",
              top: "-0.5%",
              right: "-0.5%",
            }}
            onClick={() => setImageModalOpen(false)}
          >
            <Icon color="secondary">clear</Icon>
          </IconButton>
        </Paper>
      </Modal>
    </Paper>
  )
}

export default Pictures
