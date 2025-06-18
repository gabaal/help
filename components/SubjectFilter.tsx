'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useEffect, useState } from "react"
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils"
import { subjects } from "@/constants"
import clsx from "clsx"



const SubjectFilter = () => {

const router = useRouter()
const searchParams = useSearchParams()
const query = searchParams.get("subject") || ""
const [subject, setSubject] = useState(query)

useEffect(() => {
    let newUrl= ""
    if (subject === 'all') {
        newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["subject"],
        })
    }else {
        newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: "subject",
            value: subject,
        })
    }
    console.log(newUrl)
    router.push(newUrl, { scroll: false })
}, [subject])

  return (
    <Select onValueChange={setSubject} value={subject}>
        <SelectTrigger className="input capitalize">
            <SelectValue placeholder="Subject"/>
        </SelectTrigger>

        <SelectContent>
            <SelectItem value='all'>All subjects</SelectItem>
            {subjects.map((subject) => (
                <SelectItem key={subject} value={subject} className="capitalize">
                    {subject}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
  )
}
export default SubjectFilter