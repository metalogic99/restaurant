import { api, handleApiError } from ".";

export const createReservation = async (data: ReservationRequest) => {
  try {
    const response = await api.post("/reservation", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw handleApiError(error as Error);
  }
};

export const getAvailableTables = async (time: string, date: Date) => {
  try {
    const response = await api.get(
      `/reservation/tables?time=${time}&date=${date}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw handleApiError(error as Error);
  }
};

export const getReservations = async (date?: Date, tableId?: string) => {
  try {
    const response = await api.get(
      `/reservation?tableId=${tableId}&date=${date}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw handleApiError(error as Error);
  }
};

export const getReservationsSearch = async (search?: string) => {
  try {
    const response = await api.get(
      search ? `/reservation/search?search=${search}` : `/reservation/search`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw handleApiError(error as Error);
  }
};

export const deleteReservation = async (id: string) => {
  try {
    const response = await api.delete(`/reservation/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw handleApiError(error as Error);
  }
};
