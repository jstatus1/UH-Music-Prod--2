import React, { useState, useEffect } from 'react'
import { Form, Button, Container,Row, Col } from 'react-bootstrap'
import SongBlock from '../SongBlock/SongBlock'
import './MakePlaylist.css'
import axios from 'axios'






const MakePlaylist = () => {

    //const [   songData, setSongData] = useState({ name: '', musician: ''});
    const [selectedSong, setSelectedSong] = useState({ username: '', song_title: ''});
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [songBlockList, setSongBlockList] = useState([]);

    

    useEffect(() => {
        
        async function getSongs() {
        
            const request = await axios.get('http://localhost:5000/api/get/allsongs')
            .then(res => {
                setSongBlockList(res.data);
                console.log('songList: ');
                console.log(songBlockList);

            })
            .catch(error => {
                console.log('Error retrieving all songs from front end: ');
                console.log(error);
            })
        }

        

        getSongs();
        
        /* try {
            
        } catch(err) { console.log(err); } */
    }, []);

    


    return (
        <div>
            <Row>
                <Col md="3"></Col>
                <Col md="auto">
            <h1>Create Playlist</h1>
                </Col>
                <Col md="3"></Col>
            </Row>
            <Container>
            <Row>
                <Col md="3"></Col>
                <Col md="4">
            <Form.Label>Playlist Name</Form.Label>
            <Form.Control type= "text"/> 
                </Col>
            </Row>

            <Row>
                <Col md="3"></Col>
                <Col md="4">
            <Form.Label>Playlist Description</Form.Label>
            <Form.Control type= "text"/> 
                </Col>
            </Row>



            <Row>
                
                <Col md="5">
                           
                    <Form.Label  className = "playlistPadding">Song List</Form.Label>
                    <div className="db-list-box">
                        <div className="song-block-wrapper">
                            {songBlockList.map(block => { 
                                 return(
                                    <div>
                                        <Row>
                                            <div onClick={() => setSelectedSong({ song_title: block.song_title, username: block.username })}>
                                            <SongBlock song={block}/>
                                            </div>
                                        </Row>
                                    </div>)
                                
                            })}
                        </div>
                    </div>


                </Col>

                <Col md="auto playlistPadding">
                    <div className="button-spacing"></div>
                    <Row>
                        <Button variant="primary"
                                onClick={e => {
                                    if (selectedSong.song_title !== '') {
                                    setSelectedSongs(selectedSongs.concat(selectedSong));
                                    setSelectedSong({ song_title: '', username: ''});
                                    }
                                }}>Add</Button>{' '}
                    </Row>
                    <div className="button-spacing-2"></div>
                    <Row>
                        <Button variant="primary"
                                onClick={e => {
                                    console.log(selectedSong.song_title);
                                    let updatedSongs = selectedSongs.filter(song => (song.song_title !== selectedSong.song_title) );
                                    setSelectedSongs(updatedSongs);
                                }}>Remove</Button>{' '}
                    </Row>
                </Col>

            <Col md="5">
           <Row> <Form.Label class = "playlistPadding">Playlist</Form.Label></Row>
            <div className="playlist-box">
                <div className="song-block-wrapper">
                            {selectedSongs.map(block => { 
                                return <div>
                                    <Row>
                                        <div onClick={() => setSelectedSong({ song_title: block.song_title, username: block.username })}>
                                            <SongBlock song={block}/>
                                        </div>
                                    </Row>
                                </div>
                            })}
                        </div>
                
                
            </div> 
            </Col>
            </Row>
            </Container>
            <Row>
                <Col md="4"></Col>
                <Col md="4">
                    <div className="save-button">
                <Button type="submit" variant="danger">Save Playlist</Button>
                    </div>
                </Col>
            </Row>
        </div>
            
    )
            
}

export default MakePlaylist
