const formatDataToBeReturned = data => {
  const { face_count: faceCount, image_count: imageCount, ...restOfData } = data;
  return {
    imageCount: parseInt(imageCount),
    faceCount: parseInt(faceCount),
    ...restOfData
  }
}

module.exports = {formatDataToBeReturned: formatDataToBeReturned}