// import { useState, useRef } from 'react'
// import { useDispatch } from 'react-redux'
// import { setSelectedBlockspace } from '@/store/features/walletSlice'
// import { Blockspace } from '@/types/walletAccount'

// interface UseImageUploadReturn {
//   selectedImage: string | null
//   fileInputRef: React.RefObject<HTMLInputElement | null>
//   handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
//   handleEditClick: () => void
// }

// export const useImageUpload = (blockspace: Blockspace | null): UseImageUploadReturn => {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null)
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const dispatch = useDispatch()

//   const handleEditClick = () => {
//     fileInputRef.current?.click()
//   }

//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       if (!file.type.startsWith('image/')) {
//         alert('Lütfen bir resim dosyası seçin.')
//         return
//       }

//       const reader = new FileReader()
//       reader.onloadend = () => {
//         const imageUrl = reader.result as string
//         setSelectedImage(imageUrl)
        
//         // Update Redux state if blockspace exists
//         if (blockspace) {
//           dispatch(setSelectedBlockspace({
//             ...blockspace,
//             image: imageUrl
//           }))
//         }
//       }
//       reader.readAsDataURL(file)
//     // }
//   }

//   return {
//     selectedImage,
//     fileInputRef,
//     handleImageChange,
//     handleEditClick
//   }
// } 