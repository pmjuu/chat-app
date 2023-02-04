import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allIds: ["_defaultID_rose", "_defaultID_yerin", "_defaultID_jisoo", "_defaultID_yoonseo"],
  allNames: ["rose", "백예린", "jisoo", "노윤서"],
  "_defaultID_rose": {
    userId: "_defaultID_rose",
    imageURL: "https://blog.kakaocdn.net/dn/b88cTv/btrjTYDwLlH/xgtzvL82qDKKoYkKBaqal1/img.png",
    name: "rose",
    chatId: "room1",
  },
  "_defaultID_yerin": {
    userId: "_defaultID_yerin",
    imageURL: "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fdnvefa72aowie.cloudfront.net%2Forigin%2Farticle%2F202111%2F9A53E18B67698AD1E3AC2D28C83334FE0E1F6EDC526233168030E01998F119B1.jpg%3Fq%3D95%26s%3D1440x1440%26t%3Dinside&type=a340",
    name: "백예린",
    chatId: "room2",
  },
  "_defaultID_jisoo": {
    userId: "_defaultID_jisoo",
    imageURL: "https://blog.kakaocdn.net/dn/cYoXBb/btqIMWuY1qW/fSwZ4nWQ57n0cQFEXUxdd0/img.jpg",
    name: "jisoo",
    chatId: "room3",
  },
  "_defaultID_yoonseo" : {
    userId: "_defaultID_yoonseo",
    imageURL: "https://blog.kakaocdn.net/dn/ww3E6/btrLiBmU9Ek/XtrkkyZR3AvHWWtoxk4FN0/img.jpg",
    name: "노윤서",
    chatId: "room4",
  }
};

const defaultSlice = createSlice({
  name: 'default',
  initialState,
  reducers: {},
});

export default defaultSlice.reducer;
