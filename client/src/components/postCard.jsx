import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Actions from './Action';

import moment from "moment";
import { AuthContext } from '../App';


export default function PostCard(props) {





  
    const { user, _id, title, content, image, createdOn } = props.post;
    const { auth } = React.useContext(AuthContext);
  
    return (
        
      <Card sx={{ width: "100%", boxShadow: "0 0 15px rgb(0, 0, 0, 0.2)", borderRadius: "4px" }} id={_id}>
     
        <CardHeader
          avatar={
            user ? (
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {user.name.slice(0, 1)}
              </Avatar>
            ) : null
          }
          action={auth?._id === user?._id && <Actions id={_id} />}
          title={title}
          subheader={moment(createdOn).fromNow()}
        />
        {image && (
          <CardMedia
            component="img"
            height="100%"
            image={image.imagePath} // You may need to adjust this depending on how your image data is structured
            alt={user ? user.name : ""}
          />
        )}
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>

          
        </CardContent>
      </Card>
    );
  }
  