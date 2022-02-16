import groupsAxios from "../axios/groupsAxios";
import { GroupValues } from "../pages/CreateGroup";

class GroupService {
  async createGroup(formData: GroupValues): Promise<void> {
    const token = sessionStorage.getItem("accessToken");

    await groupsAxios.post("/", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new GroupService();
