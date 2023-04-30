// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { existsSync, readdirSync, statSync } from "fs";
import { join } from "path";

type Data = {
  data: string[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const allTheThings = recursivelyBuildFolderStructure(join(__dirname, "../"));
  res.status(200).json({ data: allTheThings });
}

function recursivelyBuildFolderStructure(folderPath: string) {
  let allTheThings = [];
  allTheThings.push(folderPath);
  readdirSync(join(__dirname, "../")).forEach((filename) => {
    const joinedPath = join(folderPath, filename);
    if (!existsSync(joinedPath)) {
      allTheThings.push(`SKIPPING: ${joinedPath}`);
      return;
    }
    if (statSync(joinedPath).isDirectory()) {
      allTheThings.push(...recursivelyBuildFolderStructure(joinedPath));
    }
    allTheThings.push(joinedPath);
  });

  return allTheThings;
}