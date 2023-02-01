import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allIds: ["itsme", "KbVTEKlAtAe1rHogTY9u", "smPDjH1b2wpz9KXDgpXq", "COvImeFBTixfSEYM1BLm"],
  allNames: ["나", "rose", "백예린", "jisoo"],
  "itsme": {
    userId: "itsme",
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvyHuMUfucXd9HL6BtwU0eVmzGIrv11zhZmp3Kwz0ogjgn2QImMOwS752pDGJmd9qA_Iw&usqp=CAU",
    name: "나",
    chatId: "room0",
  },
  "KbVTEKlAtAe1rHogTY9u": {
    userId: "KbVTEKlAtAe1rHogTY9u",
    imageURL: "https://blog.kakaocdn.net/dn/b88cTv/btrjTYDwLlH/xgtzvL82qDKKoYkKBaqal1/img.png",
    name: "rose",
    chatId: "room1",
  },
  "smPDjH1b2wpz9KXDgpXq": {
    userId: "smPDjH1b2wpz9KXDgpXq",
    imageURL: "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fdnvefa72aowie.cloudfront.net%2Forigin%2Farticle%2F202111%2F9A53E18B67698AD1E3AC2D28C83334FE0E1F6EDC526233168030E01998F119B1.jpg%3Fq%3D95%26s%3D1440x1440%26t%3Dinside&type=a340",
    name: "백예린",
    chatId: "room2",
  },
  "COvImeFBTixfSEYM1BLm": {
    userId: "COvImeFBTixfSEYM1BLm",
    imageURL: "https://blog.kakaocdn.net/dn/cYoXBb/btqIMWuY1qW/fSwZ4nWQ57n0cQFEXUxdd0/img.jpg",
    name: "jisoo",
    chatId: "room3",
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default userSlice.reducer;
