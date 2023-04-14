export type originalDataType = {
  id?: number;
  title: string;
  url: string;
  rating?: number;
};
export type voteStatusType = {
  like: boolean;
  unlike: boolean;
  [key: string]: boolean;
};
export type orderType = {
  asc: boolean;
  desc: boolean;
  [key: string]: boolean;
};
export type CardBottomType = {
  item: originalDataType;
  setOriginalData: React.Dispatch<React.SetStateAction<originalDataType[]>>;
};

export type NavType = {
  originalData: originalDataType[];
  setOriginalData: React.Dispatch<React.SetStateAction<originalDataType[]>>;
  fetchData: () => Promise<void>;
  orderStatus: orderType;
  setOrderStatus: React.Dispatch<React.SetStateAction<orderType>>;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
};

export type WarningAlertType = {
  setError: React.Dispatch<React.SetStateAction<boolean>>;
};
