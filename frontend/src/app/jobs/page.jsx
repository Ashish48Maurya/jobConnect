"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Building2, MapPin, Search, Filter, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import Fuse from "fuse.js"
import { Badge } from "@/components/ui/badge"
import toast from "react-hot-toast"

export default function JobsPage() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [desc, setDesc] = useState("")
  const [exp, setExp] = useState("")
  const [resume, setResume] = useState("")

  const navigate = useRouter()
  const [openJobId, setOpenJobId] = useState(null)
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  // Filter states
  const [jobTypes, setJobTypes] = useState([])
  const [locationTypes, setLocationTypes] = useState([])
  const [minSalary, setMinSalary] = useState("")
  const [maxSalary, setMaxSalary] = useState("")

  // Mobile filter states
  const [mobileJobTypes, setMobileJobTypes] = useState([])
  const [mobileLocationTypes, setMobileLocationTypes] = useState([])
  const [mobileMinSalary, setMobileMinSalary] = useState("")
  const [mobileMaxSalary, setMobileMaxSalary] = useState("")
  const [userId, setUserId] = useState(null)

  const [filtersApplied, setFiltersApplied] = useState(false)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user"))
      if (user.role !== "job-seeker") {
        navigate.push("/")
      }
    }
  }, [])

  const handleSubmit = async (id) => {
    setLoading(true)
    let imgMsg = ""
    if (file) {
      const imageFormData = new FormData()
      imageFormData.append("file", file)
      imageFormData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESETS)

      const cloudinaryRes = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: imageFormData,
        },
      )

      const cloudinaryData = await cloudinaryRes.json()
      imgMsg = cloudinaryData.secure_url
    }
    if (!desc || !exp || !imgMsg) {
      toast.error("Please fill all the fields")
      setLoading(false)
      return
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/apply-job/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          desc,
          exp,
          resume: imgMsg,
        }),
      })
      const result = await response.json()
      if (response.ok) {
        toast.success("Job application submitted successfully")
        setDesc("")
        setExp("")
        setFile(null)
        setOpenJobId(null)
        navigate.push("/job-seeker")
      } else {
        toast.error(result.message || "Failed to apply for the job")
      }
    } catch (err) {
      toast.error(err.message || "Failed to apply for the job")
    } finally {
      setLoading(false)
    }
  }

  const getAllJobs = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/find-jobs`, {
      method: "GET",
    })
    const result = await response.json()
    if (response.ok) {
      setData(result.jobs)
      setFilteredData(result.jobs)
    } else {
      console.error(result.message || "Failed to fetch jobs")
    }
  }

  useEffect(() => {
    getAllJobs()
  }, [])

  // Apply fuzzy search
  useEffect(() => {
    if (!searchTerm && !filtersApplied) {
      setFilteredData(data)
      return
    }

    let results = [...data]

    // Apply fuzzy search if there's a search term
    if (searchTerm) {
      const fuse = new Fuse(data, {
        keys: ["jobTitle", "companyName", "location", "description", "requirements"],
        threshold: 0.3,
        includeScore: true,
      })

      const searchResults = fuse.search(searchTerm)
      results = searchResults.map((result) => result.item)
    }

    // Apply filters if any are active
    if (filtersApplied) {
      // Filter by job types
      if (jobTypes.length > 0) {
        results = results.filter((job) => jobTypes.includes(job.jobType))
      }

      // Filter by location types
      if (locationTypes.length > 0) {
        results = results.filter((job) => locationTypes.includes(job.locationType))
      }

      // Filter by salary range
      if (minSalary) {
        results = results.filter((job) => job.salaryMin >= Number.parseInt(minSalary))
      }

      if (maxSalary) {
        results = results.filter((job) => job.salaryMax <= Number.parseInt(maxSalary))
      }
    }

    setFilteredData(results)
  }, [searchTerm, data, filtersApplied, jobTypes, locationTypes, minSalary, maxSalary])

  const getDaysAgo = (createdAt) => {
    const createdDate = new Date(createdAt)
    const now = new Date()
    const timeDiff = now - createdDate
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24))
  }

  // Handle checkbox changes for job types
  const handleJobTypeChange = (type, checked) => {
    if (checked) {
      setJobTypes([...jobTypes, type])
    } else {
      setJobTypes(jobTypes.filter((t) => t !== type))
    }
    setFiltersApplied(true)
  }

  // Handle checkbox changes for location types
  const handleLocationTypeChange = (type, checked) => {
    if (checked) {
      setLocationTypes([...locationTypes, type])
    } else {
      setLocationTypes(locationTypes.filter((t) => t !== type))
    }
    setFiltersApplied(true)
  }

  // Handle mobile checkbox changes for job types
  const handleMobileJobTypeChange = (type, checked) => {
    if (checked) {
      setMobileJobTypes([...mobileJobTypes, type])
    } else {
      setMobileJobTypes(mobileJobTypes.filter((t) => t !== type))
    }
  }

  // Handle mobile checkbox changes for location types
  const handleMobileLocationTypeChange = (type, checked) => {
    if (checked) {
      setMobileLocationTypes([...mobileLocationTypes, type])
    } else {
      setMobileLocationTypes(mobileLocationTypes.filter((t) => t !== type))
    }
  }

  // Apply mobile filters
  const applyMobileFilters = () => {
    setJobTypes(mobileJobTypes)
    setLocationTypes(mobileLocationTypes)
    setMinSalary(mobileMinSalary)
    setMaxSalary(mobileMaxSalary)
    setFiltersApplied(true)
  }

  // Reset all filters
  const resetFilters = () => {
    setJobTypes([])
    setLocationTypes([])
    setMinSalary("")
    setMaxSalary("")
    setMobileJobTypes([])
    setMobileLocationTypes([])
    setMobileMinSalary("")
    setMobileMaxSalary("")
    setFiltersApplied(false)
  }

  // Reset search
  const resetSearch = () => {
    setSearchTerm("")
  }

  // Reset everything
  const resetAll = () => {
    resetFilters()
    resetSearch()
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user"))
      if (user) {
        setUserId(user._id)
      }
    }
  }, [])

  // Check if any filters are active
  const hasActiveFilters = jobTypes.length > 0 || locationTypes.length > 0 || minSalary || maxSalary

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container py-8 px-4 md:px-6">
        <div className="space-y-2 mb-8 text-center">
          <h1 className="text-3xl font-bold">Find Your Dream Job</h1>
          <p className="text-muted-foreground">Browse through thousands of job listings</p>
        </div>

        {/* Keyword Search Bar */}
        <div className="max-w-md mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              className="pl-10 pr-10"
              placeholder="Search by job title, skills, company, etc."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="absolute right-3 top-3" onClick={resetSearch} aria-label="Clear search">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[280px_1fr]">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters{" "}
                  {hasActiveFilters && (
                    <Badge className="ml-2">
                      {jobTypes.length + locationTypes.length + (minSalary ? 1 : 0) + (maxSalary ? 1 : 0)}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Narrow down your job search</SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-6">
                  {/* Filter Content - Mobile */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Job Type</h3>
                    <div className="space-y-2">
                      {["Full-time", "Part-time", "Contract", "Freelance", "Internship"].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`job-type-${type.toLowerCase()}-mobile`}
                            checked={mobileJobTypes.includes(type)}
                            onCheckedChange={(checked) => handleMobileJobTypeChange(type, checked)}
                          />
                          <Label htmlFor={`job-type-${type.toLowerCase()}-mobile`}>{type}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Location Type</h3>
                    <div className="space-y-2">
                      {["Remote", "On-site", "Hybrid"].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`location-type-${type.toLowerCase()}-mobile`}
                            checked={mobileLocationTypes.includes(type)}
                            onCheckedChange={(checked) => handleMobileLocationTypeChange(type, checked)}
                          />
                          <Label htmlFor={`location-type-${type.toLowerCase()}-mobile`}>{type}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Salary Range</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="min-salary-mobile">Min</Label>
                        <Input
                          id="min-salary-mobile"
                          type="number"
                          placeholder="0"
                          value={mobileMinSalary}
                          onChange={(e) => setMobileMinSalary(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="max-salary-mobile">Max</Label>
                        <Input
                          id="max-salary-mobile"
                          type="number"
                          placeholder="200,000+"
                          value={mobileMaxSalary}
                          onChange={(e) => setMobileMaxSalary(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" onClick={applyMobileFilters}>
                      Apply Filters
                    </Button>
                    <Button variant="outline" onClick={resetFilters}>
                      Reset
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Filters */}
          <div className="hidden md:block space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={resetFilters} className="mt-2">
                    Clear all filters
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Job Type</h3>
                  <div className="space-y-2">
                    {["Full-time", "Part-time", "Contract", "Freelance", "Internship"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`job-type-${type.toLowerCase()}`}
                          checked={jobTypes.includes(type)}
                          onCheckedChange={(checked) => handleJobTypeChange(type, checked)}
                        />
                        <Label htmlFor={`job-type-${type.toLowerCase()}`}>{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Location Type</h3>
                  <div className="space-y-2">
                    {["Remote", "On-site", "Hybrid"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`location-type-${type.toLowerCase()}`}
                          checked={locationTypes.includes(type)}
                          onCheckedChange={(checked) => handleLocationTypeChange(type, checked)}
                        />
                        <Label htmlFor={`location-type-${type.toLowerCase()}`}>{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Salary Range</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="min-salary">Min</Label>
                      <Input
                        id="min-salary"
                        type="number"
                        placeholder="0"
                        value={minSalary}
                        onChange={(e) => {
                          setMinSalary(e.target.value)
                          setFiltersApplied(true)
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-salary">Max</Label>
                      <Input
                        id="max-salary"
                        type="number"
                        placeholder="200,000+"
                        value={maxSalary}
                        onChange={(e) => {
                          setMaxSalary(e.target.value)
                          setFiltersApplied(true)
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              {filteredData.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  Showing {filteredData.length} of {data.length} jobs
                </p>
              )}
              {(searchTerm || hasActiveFilters) && (
                <Button variant="outline" size="sm" onClick={resetAll}>
                  Clear all
                </Button>
              )}
            </div>

            {filteredData.length === 0 && searchTerm && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No jobs match your criteria</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
                <Button variant="outline" className="mt-4" onClick={resetAll}>
                  Reset all
                </Button>
              </div>
            )}

            {filteredData.length === 0 && !searchTerm && (
              <div className="text-center py-12">
                <div>Jobs Not Available</div>
              </div>
            )}

            <div className="space-y-4">
              {filteredData.map((job, i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{job.jobTitle}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Building2 className="h-4 w-4" />
                          <span>{job.companyName}</span>
                          <span className="text-muted-foreground">•</span>
                          <MapPin className="h-4 w-4" />
                          <span>
                            {job.location} - {job.locationType}
                          </span>
                        </CardDescription>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {getDaysAgo(job.createdAt) === 0
                          ? "Posted today"
                          : `Posted ${getDaysAgo(job.createdAt)} day${getDaysAgo(job.createdAt) !== 1 ? "s" : ""} ago`}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <div className="rounded-full bg-secondary px-3 py-1 text-xs">{job.jobType}</div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">Job-Description: {job.description}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">Benefits: {job.benefits}</p>
                      <div className="flex flex-wrap gap-2">
                        {job.requirements.map((skill, index) => (
                          <div key={index} className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">About Company:</span>{" "}
                        {job.companyDescription || "No company description available"}
                      </div>
                      {job.companyWebsite && (
                        <div className="text-sm">
                          <span className="font-medium">Company Website:</span>{" "}
                          <a
                            href={job.companyWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {job.companyWebsite}
                          </a>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center border-t pt-4 gap-3">
                    <div className="flex flex-col w-full sm:w-auto">
                      <div className="font-medium">
                        ₹{job.salaryMin} - ₹{job.salaryMax}
                      </div>
                      {job.applicationDeadline && (
                        <span className="text-sm text-muted-foreground">
                          <span className="font-medium">Deadline:</span>{" "}
                          {new Date(job.applicationDeadline).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        {userId && (
                          <Button
                            onClick={() => setOpenJobId(i + 1)}
                            className="w-full sm:w-auto"
                            disabled={
                              new Date() > new Date(job.applicationDeadline) ||
                              (job.participants && userId
                                ? job.participants.map((id) => id.toString()).includes(userId.toString())
                                : false)
                            }
                          >
                            {job.participants &&
                            userId &&
                            job.participants.map((id) => id.toString()).includes(userId.toString())
                              ? "Already Applied"
                              : "Apply Now"}
                          </Button>
                        )}
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Apply for {job.jobTitle}</DialogTitle>
                          <DialogDescription>
                            {job.companyName} • {job.location} ({job.locationType})
                            {job.applicationDeadline && (
                              <span className="mt-1 text-sm">
                                Application Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
                              </span>
                            )}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="about-yourself">Tell us about yourself</Label>
                            <Textarea
                              id="about-yourself"
                              placeholder="Briefly describe why you're a good fit for this position..."
                              className="min-h-[100px]"
                              value={desc}
                              onChange={(e) => setDesc(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="experience">Relevant experience</Label>
                            <Textarea
                              id="experience"
                              placeholder="Describe your experience with the required skills and technologies..."
                              className="min-h-[100px]"
                              value={exp}
                              onChange={(e) => setExp(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="resume">Upload Resume</Label>
                            <Input
                              id="resume"
                              type="file"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  setFile(file)
                                }
                              }}
                              accept=".pdf,.docx,.rtf"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Accepted formats: PDF, DOCX, RTF (Max 5MB)
                            </p>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            type="submit"
                            onClick={(e) => {
                              e.preventDefault()
                              handleSubmit(job._id)
                            }}
                            disabled={loading}
                          >
                            {loading ? "Submitting..." : "Submit Application"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t">
        <div className="container py-4 px-4 md:px-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} JobConnect. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

