import React, { useEffect, useState } from "react";
import { getData } from "../services/Api";
import Box from "@mui/material/Box";
import { DataGrid, GridDeleteIcon } from "@mui/x-data-grid";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import SearchComponent from "./searchBar";
import EditIcon from "@mui/icons-material/Edit";
import ModalUse from "./commons/Modal";
import './common.css'
import UsePagePagination from "./pagination/pagination";
export default function Entries() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(false);
  const [searchItem, setSearchItem] = useState([]);
  const [popup, setPopup] = useState(false);
  const [selct, setSelect] = useState([]);
  const [pageNumber, setpageNumber] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [resData, setresData] = useState([]);
  const [id, setid] = useState("");
  useEffect(() => {
    setLoading(true);
    const t= setTimeout(() => {
      fetchEntries();
    }, 1500);
    return () => {
      clearTimeout(t)
    }
  }, []);
  const fetchEntries = async () => {
    try {
      setLoading(true);
      const res = await getData("adminui-problem/members.json");
      const [CurrentPageData,totalPage]=UsePagePagination(res.data, currentPage)
      setresData(res.data)
      setData(CurrentPageData);
      console.log("tp",totalPage)
      setpageNumber(totalPage);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };
  useEffect(() => {
    const [currentPageData]=UsePagePagination(resData, currentPage)
    setData(currentPageData);
  }, [currentPage]);
  const handleDeleteRow = () => {
    const deleteID = data.filter((item) => !selct.includes(item.id));
 const resDel = resData.filter((item) => !selct.includes(item.id));
setresData(resDel)
    setData(deleteID);
  };
  const handleDelete = (id) => {
    const delettIDS = data.filter((item) => item.id !== id);
    const res = resData.filter((item) => item.id !== id);
    setresData(res)
    setData(delettIDS);
  };
  const handleSearch = (e) => {
    const search = e.target.value;
    setSearch(true);
    const temp = [];
    data.forEach((item) => {
      if (item.name.includes(search)) {
        temp.push(item);
      } else if (item.email.includes(search)) {
        temp.push(item);
      } else if (item.role.includes(search)) {
        temp.push(item);
      }
    });
    setSearchItem(temp);
  };
  const handleEdit = (id) => {
    setid(id);
    setPopup(true);
  };
  const onChange = (e) => {
    const names = "";
    switch (e.target.name) {
      case "name":
        data[Number(id) - 1].name = e.target.value;
        break;
      case "email":
        data[Number(id) - 1].email = e.target.value;
        break;
      case "role":
        data[Number(id) - 1].role = e.target.value;
        break;
      default:
        break;
    }
  };
  const pageNumberIcon = () => {
    const icons = [];
    for (let i = 0; i < pageNumber; i++) {
      icons.push(i);
    }
    return (
      <>
        {icons.map((item) => (
          <Button
            variant="contained"
            color="secondary"
            sx={{
              minWidth: 0,
              borderRadius: "50%",
              background: "black",
              color: "#fff",
              fontSize: "0.7rem",
              width: "1em",
              height: "1rem",
              fontWeight: "900",
            }}
            className={currentPage === item ? "active-pagination-button" : ""}

            onClick={() => updates(item )}
          >
            {String(Number(item + 1))}
          </Button>
        ))}
      </>
    );
  };
  const updates = (i) => {
    console.log("i", i);
    setCurrentPage(i);
  };
  return (
    <Box sx={{ height: 400, width: "100%", padding: "1rem" }}>
      <ModalUse
        onChange={onChange}
        id={id}
        open={popup}
        onClosePop={(pop) => setPopup(pop)}
        style={style}
      />
      <SearchComponent onChange={handleSearch} />
      <DataGrid
        rows={search ? searchItem : data}
        columns={[
          { field: "id", headerName: "ID", width: 10 },
          {
            field: "name",
            headerName: "Name",
            width: 300,
          },
          {
            field: "email",
            headerName: "Email",
            width: 350,
          },
          {
            field: "role",
            headerName: "Role",
            width: 200,
          },
          {
            field: "actions",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => (
              <>
                <IconButton
                  color="primary"
                  onClick={() => handleEdit(params.row.id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => handleDelete(params.row.id)}
                >
                  <GridDeleteIcon />
                </IconButton>
              </>
            ),
          },
        ]}
        checkboxSelection
        onRowSelectionModelChange={(selectedId) => {
          setSelect(selectedId);
        }}
        disableRowSelectionOnClick
        loading={loading}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "4rem",
          padding: "1rem",
        }}
      >
        <Button variant="outlined" color="secondary" onClick={handleDeleteRow}>
          <Typography variant="p" component="span">
            Delete Selected
          </Typography>
        </Button>
        <h6>jump to page </h6>
        {currentPage+1}
        {pageNumberIcon()}
      </Box>
    </Box>
  );
}
