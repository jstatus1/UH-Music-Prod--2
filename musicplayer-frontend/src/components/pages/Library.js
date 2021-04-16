import { React, useState, useEffect } from 'react'
import { Form, Row, Col, Container, Button } from 'react-bootstrap'
import axios from 'axios'


const Library = () => {
    const [songList, setSongList] = useState([]);
    const [albumList, setAlbumList] = useState([]);
    const [playlistList, setPlaylistList] = useState([]);

    useEffect(() => {
        try {
            const songRequest = axios.get('http://localhost:5000/api/get/allsongs')
            .then(res => {
                setSongList(res.data);
                console.log('songList: ');
                console.log(songList);
            })
            .catch(error => {
                console.log('Error retrieving all songs from front end: ');
                console.log(error);
            })
        } catch(err) { console.log(err); }

        try {
            const albumRequest = axios.get('http://localhost:5000/api/get/allalbums')
            .then(res => {
                setAlbumList(res.data);
                console.log('albumList: ');
                console.log(albumList);
            })
            .catch(error => {
                console.log('Error retrieving all albums from front end: ');
                console.log(error);
            })
        } catch(err) { console.log(err); }

        try {
            const playlistRequest = axios.get('http://localhost:5000/api/get/allplaylists')
            .then(res => {
                setPlaylistList(res.data);
                console.log('playlistList: ');
                console.log(playlistList);
            })
            .catch(error => {
                console.log('Error retrieving all playlists from front end: ');
                console.log(error);
            })
        } catch(err) { console.log(err); }
    }, [null]);
     

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h2>Songs</h2>
                            <Container>
      
                                <Row>
                                
                                </Row>
                                <Row>
                                    {songList.map(song => {
                                        return <Row><Col>
                                        <div onClick={e => {
                                            /* play song */
                                        }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-play-fill" viewBox="0 0 16 16">
                                        <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM6 5.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43V5.884z"/>
                                        </svg> 
                                            <t5> {song.song_title} --- {song.username}</t5>
                                            </div>
                                                </Col></Row>
                                    })}
                                </Row>
                                


                            </Container>
                    </Col>
                    <Col>
                        <h2>Albums</h2>
                            <Container>
                                <Row>
                                    <Col md="5">
                                    <Button type="primary" size="sm" href="/createAlbum">Create Album</Button>
                                    </Col>
                                </Row>
                            <Row>
                                
                                </Row>
                                <Row>
                                {albumList.map(album => {
                                        return <Row><Col>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-play-fill" viewBox="0 0 16 16">
                                        <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM6 5.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43V5.884z"/>
                                        </svg> 
                                            <t5> {album.album_name} --- {album.username}</t5>
                                                </Col></Row>
                                    })}
                                </Row>
                                

                            </Container>

                    </Col>
                    <Col>
                        <h2>Playlists</h2>
                            <Container>
                            
                            
                                <Row>
                                    <Col md="5">
                                    <Button type="primary" size="sm" href="/createPlaylist">Create Playlist</Button>
                                    </Col>
                                </Row>
                            <Row>
                                
                                </Row>
                                <Row>
                                {playlistList.map(playlist => {
                                        return <Row><Col>
                                        <div href="/createplaylist">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-play-fill" viewBox="0 0 16 16">
                                        <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM6 5.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43V5.884z"/>
                                        </svg> 
                                        
                                            <t5> {playlist.playlist_name} --- {playlist.username}</t5>
                                        </div>
                                                </Col></Row>
                                    })}
                                </Row>
                                

                            </Container>
                    </Col>

                </Row>
            </Container>
        </div>
    )
}

export default Library
