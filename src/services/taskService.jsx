import apiClient from "../axios/axiosClient";


export const getAllTasks = async() => {
    try{
        const respone = await apiClient.get("/task/getAllTasks");
        return respone.data;
    }catch(error){
        console.error("Error fetching tasks: ",error);
        throw error;
    }
};

export const createTask = async(title) => {
    try{
        const response = await apiClient.post(
            "/task/addTask",
            title,
            {
                // we have overrided the apiclient headers as we are expecting the String from the backend
                headers:{
                    "Content-type": "text/plain",
                },
            }
        );
        return response.data;
    }   catch (error){
        console.error("Error Creating the Task: ",error);
        throw error;
    }

};

export const deleteTask = async (id) => {
  try {
    const response = await apiClient.delete(`task/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Problem deleting the task", error);
    throw error;
  }
};


export const completeTask = async (id) => {
  try {
    const response = await apiClient.put(`task/complete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Problem completing the task", error);
    throw error;
  }
};

