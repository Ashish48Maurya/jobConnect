"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Briefcase,
  Plus,
  MoreHorizontal,
  Building2,
  Users,
  BarChart,
  FileText,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Download,
  Eye,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import toast from "react-hot-toast"

const applicants = [
  {
    id: 1,
    name: "Alex Johnson",
    position: "Senior Frontend Developer",
    timeAgo: "2h ago",
    avatar: "/placeholder.svg?height=40&width=40&text=AJ",
    about:
      "I'm a passionate frontend developer with 5+ years of experience building responsive web applications. I specialize in React, TypeScript, and modern CSS frameworks.",
    experience:
      "• Senior Frontend Developer at TechCorp (2020-Present)\n• Frontend Developer at WebSolutions (2018-2020)\n• Junior Developer at StartupXYZ (2016-2018)",
    resumeUrl: "#",
  },
  {
    id: 2,
    name: "Sam Rivera",
    position: "Senior Frontend Developer",
    timeAgo: "5h ago",
    avatar: "/placeholder.svg?height=40&width=40&text=SR",
    about:
      "Full-stack developer with a focus on frontend technologies. I enjoy creating intuitive user interfaces and have experience with large-scale applications.",
    experience:
      "• Lead Developer at InnovateTech (2019-Present)\n• Full-Stack Developer at GlobalSoft (2017-2019)\n• Web Developer Intern at TechStart (2016-2017)",
    resumeUrl: "#",
  },
  {
    id: 3,
    name: "Taylor Kim",
    position: "Senior Frontend Developer",
    timeAgo: "8h ago",
    avatar: "/placeholder.svg?height=40&width=40&text=TK",
    about:
      "Frontend specialist with a background in UX/UI design. I bring both technical skills and design sensibility to create exceptional user experiences.",
    experience:
      "• Frontend Engineer at DesignTech (2021-Present)\n• UI Developer at CreativeSolutions (2018-2021)\n• UX/UI Designer at DigitalAgency (2016-2018)",
    resumeUrl: "#",
  },
  {
    id: 4,
    name: "Jordan Patel",
    position: "Senior Frontend Developer",
    timeAgo: "12h ago",
    avatar: "/placeholder.svg?height=40&width=40&text=JP",
    about:
      "Experienced developer focused on creating accessible, performant web applications. I'm passionate about web standards and modern JavaScript frameworks.",
    experience:
      "• Senior Developer at AccessibleWeb (2020-Present)\n• Frontend Developer at TechInnovate (2018-2020)\n• Web Developer at CodeCraft (2016-2018)",
    resumeUrl: "#",
  },
  {
    id: 5,
    name: "Morgan Lee",
    position: "Senior Frontend Developer",
    timeAgo: "1d ago",
    avatar: "/placeholder.svg?height=40&width=40&text=ML",
    about:
      "Frontend developer with a strong focus on performance optimization and modern JavaScript frameworks. I enjoy solving complex UI challenges.",
    experience:
      "• Performance Engineer at FastWeb (2019-Present)\n• Frontend Developer at OptimizeTech (2017-2019)\n• Junior Developer at WebCraft (2015-2017)",
    resumeUrl: "#",
  },
]


function ApplicationViewer({ applicant }) {
  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={applicant.avatar} alt={applicant.name} />
            <AvatarFallback>
              {applicant.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span>{applicant.name}</span>
        </DialogTitle>
        <DialogDescription>
          Applied for: {applicant.position} • {applicant.timeAgo}
        </DialogDescription>
      </DialogHeader>
      <ScrollArea className="max-h-[60vh]">
        <div className="space-y-6 px-1 py-2">
          <div>
            <h3 className="text-sm font-medium text-primary mb-2">Tell me about yourself</h3>
            <p className="text-sm text-muted-foreground">{applicant.about}</p>
          </div>
          <Separator />
          <div>
            <h3 className="text-sm font-medium text-primary mb-2">Relevant Experience</h3>
            <pre className="text-sm text-muted-foreground whitespace-pre-line">{applicant.experience}</pre>
          </div>
          <Separator />
          <div>
            <h3 className="text-sm font-medium text-primary mb-2">Resume</h3>
            <div className="border rounded-lg p-4 bg-muted/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">{applicant.name} - Resume.pdf</span>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
      <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
        <Button variant="outline" className="sm:mr-auto">
          <Eye className="h-4 w-4 mr-2" />
          View Full Profile
        </Button>
        <div className="flex gap-2">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button>Contact Applicant</Button>
        </div>
      </DialogFooter>
    </DialogContent>
  )
}

export default function page() {
  const [data, setData] = useState([])
  const [selectedApplicant, setSelectedApplicant] = useState(null)
  const [loading, setLoading] = useState(false);

  const getAllJobs = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/jobs`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    });
    const data = await response.json();
    if (response.ok) {
      setData(data.jobs);
      console.log(data.jobs)
    } else {
      toast.error(data.message || "Failed to fetch jobs");
    }
  }

  const handleDelete = async (jobId) => {
    const confirmed = window.confirm("Are you sure you want to delete this job?");
    if (!confirmed) return;
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/job/${jobId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Job deleted successfully");
        getAllJobs()
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message)
      toast.error("An error occurred while deleting the job");
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllJobs()
  }, [])

  const getDaysAgo = (createdAt) => {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const timeDiff = now - createdDate;
    const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    console.log(daysAgo)
    return daysAgo;
  };

  const isApplicationClosed = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    return now > deadlineDate;
  };


  return (
    <div className="flex min-h-screen bg-muted/10">

      {/* Main Content */}
      <div className="flex flex-col flex-1">

        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Employer Dashboard</h1>
                <p className="text-muted-foreground">Manage your job postings and applicants</p>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/post-job">
                  <Button className="gap-1 shadow-sm">
                    <Plus className="h-4 w-4" /> Post a Job
                  </Button>
                </Link>
              </div>
            </div>

            <Tabs defaultValue="jobs" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="jobs">Recent Job Postings</TabsTrigger>
                <TabsTrigger value="applicants">Recent Applicants</TabsTrigger>
              </TabsList>

              <TabsContent value="jobs" className="space-y-4">
                {
                  data.length === 0 ? <>
                    <Card className="text-center p-6">
                      <CardHeader>
                        <CardTitle>No Job Postings Found</CardTitle>
                        <CardDescription>You have not posted any jobs yet.</CardDescription>
                      </CardHeader>
                      <CardContent className="text-muted-foreground">
                        Click the button above to post a new job.
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" onClick={() => router.push("/post-job")}>
                          Post a Job
                        </Button>
                      </CardFooter>
                    </Card>
                  </> : <>
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Job Postings</CardTitle>
                        <CardDescription>Your most recent job listings</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {data?.map((job) => (
                            <div
                              key={job._id}
                              className="flex items-center justify-between space-x-4 rounded-lg border p-4 shadow-sm"
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-8">
                                  <h3 className="font-medium">{job.jobTitle}</h3>
                                  {isApplicationClosed(job.applicationDeadline) ? (
                                    <Badge variant="destructive">Application Closed</Badge>
                                  ) : (
                                    <Badge variant="outline">Open</Badge>
                                  )}
                                </div>

                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <span>
                                    Posted {getDaysAgo(job.createdAt)} day{getDaysAgo(job.createdAt) !== 1 ? "s" : ""} ago
                                  </span>
                                  <span>•</span>
                                  <span>{job.participants?.length} applicants</span>
                                </div>
                                <div className="flex gap-2 mt-1">

                                  <Badge variant="outline">
                                    {job.jobType}
                                  </Badge>
                                  <Badge variant="outline">
                                    {job.locationType}
                                  </Badge>

                                </div>

                                <p className="text-sm text-muted-foreground">
                                  Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
                                </p>
                              </div>

                              <div className="flex items-center gap-2">
                                <Link href={`/edit-job/${job._id}`}>
                                  <Button variant="outline" size="sm">
                                    Edit
                                  </Button>
                                </Link>
                                <Button variant="destructive" size="sm" onClick={() => handleDelete(job._id)} disabled={loading}>
                                  {
                                    loading ? "Deleting..." : "Delete"
                                  }
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>

                    </Card>
                  </>
                }
              </TabsContent>

              <TabsContent value="applicants" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Applicants</CardTitle>
                    <CardDescription>Latest candidates who applied to your jobs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {applicants.map((applicant) => (
                        <div key={applicant.id} className="flex items-center gap-4 p-3 rounded-lg border shadow-sm">
                          <Avatar>
                            <AvatarImage src={applicant.avatar} alt={applicant.name} />
                            <AvatarFallback>
                              {applicant.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">{applicant.name}</p>
                              <span className="text-xs text-muted-foreground">{applicant.timeAgo}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">Applied for: {applicant.position}</p>
                          </div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedApplicant(applicant)}>
                                View Application
                              </Button>
                            </DialogTrigger>
                            <ApplicationViewer applicant={applicant} />
                          </Dialog>
                        </div>
                      ))}
                    </div>
                  </CardContent>

                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

