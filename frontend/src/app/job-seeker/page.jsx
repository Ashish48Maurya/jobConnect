"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Building2,
} from "lucide-react"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function page() {

  const [data, setData] = useState([])
  const navigate = useRouter()
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user"))
      if (user.role !== "job-seeker") {
        navigate.push("/")
      }
    }
  }, []);

  const fetchJobs = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/applied-job`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    const data = await response.json()
    if (response.ok) {
      setData(data.jobs)
      console.log(data.jobs)
    } else {
      toast.error(data.message)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col flex-1">
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Your Dashboard</h1>
                <p className="text-muted-foreground">Track your applications and job search progress</p>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/jobs">
                  <Button className="gap-1">
                    <Search className="h-4 w-4" /> Find Jobs
                  </Button>
                </Link>
              </div>
            </div>

            {
              data.length === 0 ? <>
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>No Applications Found</CardTitle>
                    <CardDescription>Start applying for jobs to see them here</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">No applications found. Start applying for jobs to see them here.</p>
                  </CardContent>
                </Card>
              </> : <>
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>Track the status of your recent job applications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {data.map((application, index) => (
                        <div key={index} className="flex items-center justify-between space-x-4 rounded-lg border p-4">
                          <div className="flex items-center space-x-4">
                            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                              <Building2 className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div className="space-y-1">
                              <h3 className="font-medium">{application.job.jobTitle}</h3>
                              <p className="text-sm text-muted-foreground">{application.job.companyName}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <Badge
                                variant={
                                  application.status === "In-review"
                                    ? "default"
                                    : application.status === "Rejected"
                                      ? "destructive"
                                      : "outline"
                                }
                              >
                                {application.status}
                              </Badge>
                              <p className="text-xs text-muted-foreground mt-1">
                                {new Date(application.createdAt).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </p>
                            </div>

                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            }
          </div>
        </main>
      </div>
    </div>
  )
}

