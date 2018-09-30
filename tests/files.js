import structuredClone from "../index.js";

describe("files and blobs", function() {
  class CustomFile extends File {}

  const SUPPORTS_DATATRANSFER = (() => {
    try {
      new DataTransfer();
      return true;
    } catch (_) {
      return false;
    }
  })();

  it("can clone a file", async function() {
    const file = new File(["content"], "name");
    const clonedFile = structuredClone(file);

    expect(clonedFile).to.be.deep.equal(file);
    expect(clonedFile).to.be.instanceof(File);
    expect(await blobToString(clonedFile)).to.be.equal(
      await blobToString(file)
    );
  });

  it("can clone a blob", async function() {
    const blob = new Blob(["content"]);
    const clonedBlob = structuredClone(blob);

    expect(clonedBlob).to.be.deep.equal(blob);
    expect(clonedBlob).to.be.instanceof(Blob);
    expect(await blobToString(clonedBlob)).to.be.equal(
      await blobToString(blob)
    );
  });

  // Can't test in browsers that don't support creating a DataTransfer
  if (SUPPORTS_DATATRANSFER) {
    it("can clone a filelist", function() {
      const dataTransfer = new DataTransfer();
      const file = new File(["content"], "name");
      dataTransfer.items.add(file);

      const fileList = dataTransfer.files;
      const clonedFileList = structuredClone(fileList);

      expect(clonedFileList).to.be.deep.equal(fileList);
      expect(clonedFileList).to.be.instanceof(FileList);
    });
  }

  it("can clone a custom file", async function() {
    const customFile = new CustomFile(["content"], "name");
    const clonedCustomFile = structuredClone(customFile);

    expect(clonedCustomFile).to.be.deep.equal(customFile);
    expect(clonedCustomFile).to.be.instanceof(File);
    expect(await blobToString(clonedCustomFile)).to.be.equal(
      await blobToString(customFile)
    );
  });
});

function blobToString(blob) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = event => res(event.target.result);
    res.onerror = rej;
    reader.readAsText(blob);
  });
}
