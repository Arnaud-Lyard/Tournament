import { useState } from 'react';

function useCheckFormErrors() {
  const [errors, setErrors] = useState<string[]>([]);

  const handleErrors = (e: any) => {
    if (e?.response?.data?.errors?.length) {
      setErrors(e.response.data.errors.map((err: any) => err.message));
    } else if (e?.response?.data?.message) {
      setErrors([e.response.data.message]);
    } else {
      setErrors(['An error occurred, please try again']);
    }
  };

  return [errors, handleErrors];
}

export default useCheckFormErrors;
