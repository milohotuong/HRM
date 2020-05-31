// import * as CryptoJS from 'crypto-js';
// export class EncryptService {

// encryptData(data) {

//     try {
//         return CryptoJS.AES.encrypt(JSON.stringify(data), "abc").toString();
//     } catch (e) {
//         console.log(e);
//     }
// }

// decryptData(data) {

//     try {
//         const bytes = CryptoJS.AES.decrypt(data, "abc");
//         if (bytes.toString()) {
//             return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//         }
//         return data;
//     } catch (e) {
//         console.log(e);
//     }
// }
// }