function removeImage(cell) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheetg = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  if (sheet.getActiveSheet().getName !== "Calendar") {
    SpreadsheetApp.setActiveSheet(sheet.getSheets()[4]);
  }

  for (i = 0; i < sheet.getImages().length; i++) {
    let img = sheet.getImages()[i]
    // if(cell === img.getAnchorCell().getA1Notation()) {
    //   img.remove()
    // }
  }

  const dummy = sheet.getImages()[0];
  console.log(
    dummy.getAnchorCell().getA1Notation(),
    sheet.getColumnWidth(dummy.getAnchorCell().getColumn()),
    sheet.getRowHeight(dummy.getAnchorCell().getRow()),
    dummy.getAnchorCell().getHeight(),
    dummy.getAnchorCell().getCell(1, 1).getWidth(),
    dummy.getHeight(),
    dummy.getWidth(),
    dummy.getAnchorCellXOffset(),
    dummy.getAnchorCellYOffset())
  dummy.setAnchorCellXOffset(0)
  dummy.setAnchorCellYOffset(0)
}

function adjustImage(images, target, sheet) {
  for (var i = 0; i < images.length; i++) {
    var img = images[i];
    let imgCell = img.getAnchorCell().getA1Notation()

    // Check if the image is in the edited cell
    if (imgCell === target) {
      console.log("TARGET", sheet.getColumnWidth(img.getAnchorCell().getColumn()))
      img.setAnchorCellXOffset(sheet.getColumnWidth(img.getAnchorCell().getColumn()) - img.getWidth())
      img.setAnchorCellYOffset(0)
      break;
    }
  }

}

function onEdit(e) {
  var sheet = e.source.getActiveSheet();
  var range = e.range; // The range that was edited
  var newValue = e.value ?? e.range.getValue(); // The new value entered

  // Define the image URL
  const imgBank = {
    "Wishing Week": 'https://supersnail.wiki.gg/images/thumb/2/2a/Wish_Coin.png/30px-Wish_Coin.png',
    "Lottery Week": 'https://supersnail.wiki.gg/images/thumb/8/85/Lottery_Ticket.png/30px-Lottery_Ticket.png',
    "Offering Week": "https://supersnail.wiki.gg/images/thumb/e/e1/Soul_I.png/30px-Soul_I.png"
  }
  let wishCoinImg = 'https://supersnail.wiki.gg/images/thumb/2/2a/Wish_Coin.png/30px-Wish_Coin.png';
  let lotteryTicketImg = 'https://supersnail.wiki.gg/images/thumb/8/85/Lottery_Ticket.png/30px-Lottery_Ticket.png'
  // Check if the new value is "Insert Image"

  // console.log("CHECK IMAGE", sheet.getImages().length);
  // Logger.log("LOG IMAGE", sheet.getImages().length);

  if (["Lottery Week", "Wishing Week", "Offering Week"].includes(newValue)) {
    // Logger.log("Inserting image for value: " + newValue);

    // Fetch the image as a blob
    var imageBlob = UrlFetchApp.fetch(imgBank[newValue]).getBlob();

    // Insert the image over the edited cell
    sheet.insertImage(imageBlob, range.getColumn(), range.getRow());
    adjustImage(sheet.getImages(), range.getA1Notation(), sheet)
  } else {
    // console.log("RANGE", range.getA1Notation(), sheet)
    // removeImage(range.getA1Notation())
    // If the new value is not "Insert Image", remove the image
    var images = sheet.getImages(); // Get all images on the sheet
    var imageToRemove = null;

    // Loop through the images to find the one in the edited cell
    for (var i = 0; i < images.length; i++) {
      var img = images[i];
      let imgCell = img.getAnchorCell().getA1Notation()

      // Check if the image is in the edited cell
      if (imgCell === range.getA1Notation()) {
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