export interface Environment {
  dbAdress: string;
  dbPort: number
}

export const env: Environment = {
  dbAdress: '127.0.0.1',
  dbPort: 27017
};
