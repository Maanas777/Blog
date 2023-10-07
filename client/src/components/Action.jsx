import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';

export default function Actions({ id }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigator = useNavigate()
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleUpdate = () => {
        console.log(id);
        navigator("/update/"+id)
    }

    const handleDelete = async () => {
        console.log(id);
        const res = await fetch("http://localhost:7000/api/blog/deleteblog/"+id, {
            method: "DELETE",
            headers: {
                token: localStorage.getItem("token")
            }
        })
        const data = await res.json();
        if(res.ok){
            alert("blog deleted")
        }else{
            console.log(data);
        }
    }

    const downloadBlog = (props) => {
        const blogData = {
          title: props.post.title,
          content: props.post.content,
        };
      
        const blob = new Blob([JSON.stringify(blogData, null, 2)], {
          type: "application/json",
        });
      
        const url = URL.createObjectURL(blob);
      
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = `${props.post.title}.json`; // Set the filename
      
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      };
      










    return (
        <div>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => {
                    handleClose()
                    handleUpdate()
                }}>
                    Update
                </MenuItem>
                <MenuItem onClick={() => {
                    handleClose()
                    handleDelete()
                }}>
                    Delete
                </MenuItem>

                <MenuItem onClick={() => {
                    handleClose()
                    downloadBlog()
                }}>
                    Download
                </MenuItem>




            </Menu>
        </div>
    );
}