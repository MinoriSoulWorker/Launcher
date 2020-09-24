export type ApiGameFilePart = {
  url: string;
  size: number;
};

export type ApiGameFile = {
  name: string;
  size: number;
  hash: string;
  parts: ApiGameFilePart[];
};

export type ApiGameFiles = {
  count: number;
  files: ApiGameFile[];
};
