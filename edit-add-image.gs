function myFunc() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  SpreadsheetApp.setActiveSheet(sheet.getSheets()[4]);

  for (i = 0; i < sheet.getImages().length; i++) {
    let img = sheet.getImages()[i]
    console.log(img.getAnchorCell().getA1Notation())
  }
  console.log(sheet.getImages()[0].getAnchorCell().getA1Notation())
}

function onEdit(e) {
  Logger.log("LOGGER E", e.range.getColumn(), e.range.getRow());

  var sheet = e.source.getActiveSheet();
  var range = e.range; // The range that was edited
  var newValue = e.value; // The new value entered

  // Define the image URL
  let wishCoinImg = 'https://supersnail.wiki.gg/images/thumb/2/2a/Wish_Coin.png/30px-Wish_Coin.png';

  // Check if the new value is "Insert Image"
  if (newValue === 'Insert Image') {
    Logger.log("Inserting image for value: " + newValue);

    // Fetch the image as a blob
    var imageBlob = UrlFetchApp.fetch(wishCoinImg).getBlob();

    // Insert the image over the edited cell
    sheet.insertImage(imageBlob, range.getColumn(), range.getRow());
  } else {
    // If the new value is not "Insert Image", remove the image
    var images = sheet.getImages(); // Get all images on the sheet
    var imageToRemove = null;

    console.log("CON I", images)
    Logger.log("LOG I", images)

    // Loop through the images to find the one in the edited cell
    for (var i = 0; i < images.length; i++) {
      var img = images[i];
      var imgRow = img.getAnchorRow();
      var imgCol = img.getAnchorColumn();

      // Check if the image is in the edited cell
      if (imgRow === range.getRow() && imgCol === range.getColumn()) {
        imageToRemove = img; // Store the image to remove
        break;
      }
    }

    // Remove the image if found
    if (imageToRemove) {
      Logger.log("Removing image from cell: " + range.getA1Notation());
      imageToRemove.remove();
    }
  }
}