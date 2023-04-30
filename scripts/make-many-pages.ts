import { constants } from "node:fs";
import { copyFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

async function main() {
  const copyEm = [
    // {
    //   destFolder: join(__dirname, "../src/pages/isr"),
    //   sourceFile: join(__dirname, "isr-template.tsx"),
    //   nameTemplate: "isr{}.tsx",
    //   howMany: 800,
    // },
    // {
    //   destFolder: join(__dirname, "../src/pages/fun"),
    //   sourceFile: join(__dirname, "page-template.tsx"),
    //   nameTemplate: "page{}.tsx",
    //   howMany: 800,
    // },
    {
      destFolder: join(__dirname, "../public/small-files"),
      sourceFile: join(__dirname, "one-hundred-bytes.png"),
      nameTemplate: "one-hundred-bytes-{}.png",
      howMany: 100_000,
    },
  ];

  for (const oneItem of copyEm) {
    await mkdir(oneItem.destFolder, { recursive: true });

    for (let i = 0; i < oneItem.howMany; i++) {
      const fileName = oneItem.nameTemplate.replace("{}", i.toString());
      const filePath = join(oneItem.destFolder, fileName);
      await copyFile(oneItem.sourceFile, filePath, constants.COPYFILE_FICLONE);
    }
  }
}

main().then(console.log).catch(console.error);
