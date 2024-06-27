import * as Yup from 'yup';

export const validationSchema = Yup.object({  
    username: Yup.string().required('Please enter username'),
    room: Yup.string().required('Please enter room name'),
  });