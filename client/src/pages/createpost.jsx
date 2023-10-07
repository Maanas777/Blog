import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import axios from 'axios';

const CreateBlogForm = () => {
  const [formData, setFormData] = useState({ title: '', content: '', image: null });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendData = new FormData();
    sendData.append('title', formData.title);
    sendData.append('content', formData.content);
    if (formData.image) {
        
        sendData.append('image', formData.image, formData.image.name);
    }

    try {
      const response = await axios.post('http://localhost:7000/api/blog/createBlog', sendData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: localStorage.getItem("token")
        },
      });

      if (response.status === 200) {
        alert('Blog created successfully!');
        setFormData({ title: '', content: '', image: null });
      } else {
        alert('Error creating blog.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error');
    }
  };

  return (
    <Card sx={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Create a Blog
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Headline"
            name="title"
            variant="outlined"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Content"
            name="content"
            multiline
            rows={4}
            variant="outlined"
            value={formData.content}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleChange}
            style={{ display: 'none' }}
            id="image-input"
          />
          <label htmlFor="image-input">
            <Button
              component="span"
              variant="outlined"
              color="primary"
              sx={{ mt: 2 }}
            >
              Upload Image
            </Button>
          </label>
          {formData.image && (
            <Typography variant="body2" sx={{ mt: 2 }}>
              Selected Image: {formData.image.name}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            fullWidth
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateBlogForm;
