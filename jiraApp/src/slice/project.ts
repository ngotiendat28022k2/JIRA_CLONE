import {
  Action,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import ProjectAPI from "../api/project";
import { IProject } from "../interfaces/project";
import { nanoid } from "nanoid";
import { DropResult } from "react-beautiful-dnd";
import UpdateProject from "../component/project/updateProject";
import { useDispatch } from "react-redux";
import { updateIssue } from "./issue";
import issueAPi from "../api/issue";

export const fetchProjects = createAsyncThunk(
  "project/getProjects",
  async () => {
    const projects = await ProjectAPI.listProject();
    return projects;
  }
);
export const fetchProject = createAsyncThunk(
  "project/getProject",
  async (id: string) => {
    const project = await ProjectAPI.readProject(id as string);
    return project;
  }
);

export const removeProject = createAsyncThunk(
  "project/removeProject",
  async (id: string) => {
    await ProjectAPI.removeProject(id as string);
    const project = await ProjectAPI.listProject();
    return project;
  }
);

export const createProject = createAsyncThunk(
  "project/createProject",
  async (data: IProject) => {
    await ProjectAPI.createProject(data);
    // const project = await ProjectAPI.listProject();
    // return project;
  }
);

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async (data: IProject) => {
    const project = await ProjectAPI.upadteProject(data);
    // await ProjectAPI.readProject(data.id);
    return project;
  }
);

export const searchIssue = createAsyncThunk(
  "issue/searchIssue",
  async (data: string) => {
    const valueSearch = await issueAPi.searchIssue(data);
    return valueSearch;
  }
);

const initialColumns: {
  id: string;
  status: string;
  name: string;
  items: any[];
}[] = [
  {
    id: nanoid(6),
    status: "backlog",
    name: "BACK LOG",
    items: [],
  },
  {
    id: nanoid(6),
    status: "selected",
    name: "SELECTED FOR DEVELOPMENT",
    items: [],
  },
  {
    id: nanoid(6),
    status: "inprogress",
    name: "IN PROGRESS",
    items: [],
  },
  {
    id: nanoid(6),
    status: "done",
    name: "DONE",
    items: [],
  },
];

const initialState: {
  value: IProject[];
  checkCreate: boolean;
  columnsForm: { id: string; status: string; name: string; items: any[] }[];
} = {
  value: [],
  checkCreate: false,
  columnsForm: initialColumns,
};

const projectSlide = createSlice({
  name: "project",
  initialState,
  reducers: {
    updateDragg: (state, action: Action<DropResult>) => {
      const columns = state.columnsForm;
      const result = action.payload;
      // console.log("columns", columns);
      // console.log("result dragg", result);
      if (!result.destination) return;
      if (result.source.droppableId !== result.destination.droppableId) {
        const sourceColumn = columns.find(
          (column) => column.status === result.source.droppableId
        );
        const destColumn = columns.find(
          (column) => column.status === result.destination.droppableId
        );
        // console.log("sourceColumn", sourceColumn);
        // console.log("destColumn", destColumn);
        const [removed] = sourceColumn?.items.splice(result.source.index, 1);
        destColumn?.items.splice(result.destination.index, 0, removed);
      } else {
        const column = columns.find(
          (column) => column.status === result.source.droppableId
        );
        const copyItem = column.items;
        // console.log("copyColumn", copyItem);
        const [removed] = copyItem.splice(result.source.index, 1);
        copyItem.splice(result.destination.index, 0, removed);
      }
    },
    resetColumnForm: (state) => {
      state.columnsForm = initialColumns;
    },
    setColumnIssue: (state, action: any) => {
      const newColumnForm: any = JSON.parse(JSON.stringify(initialColumns));
      action.payload?.map((issue: any) => {
        // console.log("issue slide", issue);
        let index = 0;
        switch (issue.status) {
          case "backlog":
            index = 0;
            break;
          case "selected":
            index = 1;
            break;
          case "inprogress":
            index = 2;
            break;
          case "done":
            index = 3;
            break;
        }
        newColumnForm[index].items.push(issue);
      });
      state.columnsForm = newColumnForm;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.fulfilled, (state, action: any) => {
      state.value = action.payload;
    });
    builder.addCase(fetchProject.fulfilled, (state, action: any) => {
      // state.value = action;
      action.payload?.issues?.map((issue: any) => {
        let index = 0;
        switch (issue.status) {
          case "backlog":
            index = 0;
            break;
          case "selected":
            index = 1;
            break;
          case "inprogress":
            index = 2;
            break;
          case "done":
            index = 3;
            break;
        }
        state.columnsForm[index].items.push(issue);
      });
    });

    builder.addCase("resetColumnForm", (state) => {
      state.columnsForm = initialColumns;
    });
    builder.addCase(searchIssue.fulfilled, (state, action: any) => {
      const newColumnForm: any = JSON.parse(JSON.stringify(initialColumns));
      action.payload?.map((issue: any) => {
        // console.log("issue slide", issue);
        let index = 0;
        switch (issue.status) {
          case "backlog":
            index = 0;
            break;
          case "selected":
            index = 1;
            break;
          case "inprogress":
            index = 2;
            break;
          case "done":
            index = 3;
            break;
        }
        newColumnForm[index].items.push(issue);
      });
      state.columnsForm = newColumnForm;
    });
    builder.addCase(createProject.fulfilled, (state, action: any) => {
      // state.value = action.payload;
    });
    builder.addCase(createProject.rejected, (state, action: any) => {
      throw new Error();
    });
    builder.addCase(updateProject.fulfilled, (state, action: any) => {
      state.value = action.payload;
    });
    builder.addCase(removeProject.fulfilled, (state, action: any) => {
      state.value = action.payload;
    });
  },
});
export const { resetColumnForm, updateDragg, updateColumn, setColumnIssue } =
  projectSlide.actions;

export default projectSlide.reducer;
