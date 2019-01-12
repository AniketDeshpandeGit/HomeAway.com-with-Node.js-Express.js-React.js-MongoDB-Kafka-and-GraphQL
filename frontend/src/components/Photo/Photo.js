import React from 'react';
import ImageUploader from 'react-images-upload';
import axios from 'axios';

class Photo extends React.Component {
 
    constructor(props) {
        super(props);
         this.state = { pictures: [] };
         this.onDrop = this.onDrop.bind(this);
    }
 
    onDrop(picture,pictureDataURLs) {
        //console.log(picture)
       // console.log("url"+ pictureDataURLs)

        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
       

        const data = {
            photo : this.state.pictures,
            url :pictureDataURLs
        }
       // console.log(data)
   
        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/photo',data)
            .then(response => {
                //console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        authFlag : true
                    })
                }else{
                    this.setState({
                        authFlag : false
                    })
                }
            });
    }
 
    render() {
        return (
            <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif','jpeg']}
                maxFileSize={5242880}
                withPreview
                multiple
            />
            
            
        );
    }
}
export default Photo;