import axios from "axios"
import { getStorage } from "../helper/localStorageUtils"

const sample = "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"

export default async function postRequest(word) {
  const storedData = getStorage()

  console.log(storedData.value)
  const instance = axios.create({
    baseURL: "https://api.openai.com/v1",
    headers: {
      Authorization: `Bearer ${storedData.value}`,
    },
  })

  const response = await instance
    .post("/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `give me a bussiness summary of this website and its key feature ${word}`,
        },
      ],
    })
    .then(function (response) {
      // console.log(response)
      return response
    })
    .catch(function (error) {
      console.log(error)
    })

  return response.data.choices[0].message.content
}

// "prompt_tokens": 35,
// "completion_tokens": 434,
// "total_tokens": 469
