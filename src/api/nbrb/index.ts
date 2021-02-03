export const fetchRate = async (currency: string) => {
  const response = await fetch(
    ` https://www.nbrb.by/api/exrates/rates/${currency}?parammode=1`
  );

  return response.json();
};
