import React, { Component } from 'react'
import { Text, PaddingBox, Card, CardAreaMain, CardMedia, Button } from 'reactackle'
import ImageUploader from 'react-images-upload' 
import styled from 'styled-components'
import Zip from 'jszip'
import { saveAs } from 'file-saver'

const ImgCard = ({ src }) => (
  <div style={{ width: '100%', maxWidth: '400px' }}>
    <Card>
      <CardAreaMain>
        <CardMedia mediaElement={<img style={{ width: '100%', maxWidth: '400px' }} src={src} alt="" />} />
      </CardAreaMain>
    </Card>
  </div>
)

const CTN = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  > div {
    margin: 16px;
  }
`

class App extends Component {
  state = {
    inputPic: []
  }
  onDrop = (pictureFiles, pictureDataURLs) => {
    this.setState({
      inputPic: pictureDataURLs,
    })
  }
  download = () => {
    // change this to stamped image soon
    const zip = new Zip()
    this.state.inputPic.map((data, index) => zip.file(`${index}.jpg`, data.split(',')[1], { base64: true }))
    zip.generateAsync({type:"blob"}).then(content => {
      saveAs(content)
    })
  }
  render() {
    return (
      <>
        <PaddingBox paddingSize="large">
          <Text display="headline">Input</Text>
          <ImageUploader
            withIcon={true}
            buttonText='Choose images'
            onChange={this.onDrop}
            imgExtension={['.jpg', '.jpeg', '.png']}
            maxFileSize={5242880}
          />
          <CTN>
            {this.state.inputPic.map(data => <ImgCard key={data} src={data} />)}
          </CTN>
        </PaddingBox>
        <PaddingBox paddingSize="large">
          <Text display="headline">Output</Text>
          <CTN>

          </CTN>
          <Button colorScheme="primary" text="Download" size="large" onPress={this.download} />
        </PaddingBox>
      </>
    )
  }
}

export default App
