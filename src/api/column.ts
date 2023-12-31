import { instanceFiles } from '@/libs/api';
import axios, { AxiosError } from 'axios';

export async function postColumnImage(body: FormData, columnId: string) {
  const tokenResponse = await axios.post('/api/getToken');
  const token = tokenResponse.data;

  if (token) {
    const response = await instanceFiles({
      method: 'POST',
      url: `/columns/${columnId}/card-image`,
      data: body,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
  return;
}

export async function postColumnAdd(body: Object) {
  try {
    const option = {
      endpoint: '/columns',
      method: 'POST',
      data: body,
    };

    const result = await axios.post('/api/withAuthHandler', option);
    if (result.status === 201) {
      return true;
    }
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      alert(e.response?.data.message || e.message);
    }
    return false;
  }
}

export async function getColumns(dashboardId: number) {
  const option = {
    endpoint: `/columns?dashboardId=${dashboardId}`,
    method: 'GET',
  };

  const result = await axios.post('/api/withAuthHandler', option);
  return result.data.data;
}

export async function putColumns(columnId: number, title: string) {
  const data = {
    title: title,
  };

  const option = {
    endpoint: `/columns/${columnId}`,
    method: 'PUT',
    data: data,
  };

  const result = await axios.post('/api/withAuthHandler', option);
  return result.data;
}
