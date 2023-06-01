import { useState } from "react";

export function useForm() {
  const [form_data, setFormData] = useState({});

  const setFormField = <T extends HTMLInputElement | HTMLTextAreaElement>(
    e: React.ChangeEvent<T>
  ): void => {
    const { name, value } = e.target;
    const files =
      "files" in e.target && e.target.files != null && e.target.files;

    if (name != null) {
      setFormData((snapshot) => {
        return { ...snapshot, [name]: files ? files : value };
      });
    }
  };

  return { form_data, setFormField };
}

export default useForm;
