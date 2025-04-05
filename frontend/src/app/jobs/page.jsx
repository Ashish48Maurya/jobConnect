"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Briefcase, Building2, MapPin, Search, Filter } from "lucide-react"
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

export default function JobsPage() {
  const [openJobId, setOpenJobId] = useState(null)

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container py-8 px-4 md:px-6">
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-bold">Find Your Dream Job</h1>
          <p className="text-muted-foreground">Browse through thousands of job listings</p>
        </div>

        <div className="grid gap-6 md:grid-cols-[280px_1fr]">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
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
                          <Checkbox id={`job-type-${type.toLowerCase()}-mobile`} />
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
                          <Checkbox id={`location-type-${type.toLowerCase()}-mobile`} />
                          <Label htmlFor={`location-type-${type.toLowerCase()}-mobile`}>{type}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Experience Level</h3>
                    <div className="space-y-2">
                      {["Entry Level", "Mid Level", "Senior Level", "Director", "Executive"].map((level) => (
                        <div key={level} className="flex items-center space-x-2">
                          <Checkbox id={`experience-${level.toLowerCase().replace(" ", "-")}-mobile`} />
                          <Label htmlFor={`experience-${level.toLowerCase().replace(" ", "-")}-mobile`}>{level}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Salary Range</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="min-salary-mobile">Min</Label>
                        <Input id="min-salary-mobile" type="number" placeholder="0" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="max-salary-mobile">Max</Label>
                        <Input id="max-salary-mobile" type="number" placeholder="200,000+" />
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">Apply Filters</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Filters */}
          <div className="hidden md:block space-y-6">
            <Card >
              <CardHeader>
                <CardTitle>Search</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="keywords">Keywords</Label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="keywords" placeholder="Job title, skills, or company" className="pl-8" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="location" placeholder="City, state, or zip code" className="pl-8" />
                    </div>
                  </div>
                  <Button className="w-full">Search</Button>
                </div>
              </CardContent>
            </Card>

            <Card >
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Job Type</h3>
                  <div className="space-y-2">
                    {["Full-time", "Part-time", "Contract", "Freelance", "Internship"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox id={`job-type-${type.toLowerCase()}`} />
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
                        <Checkbox id={`location-type-${type.toLowerCase()}`} />
                        <Label htmlFor={`location-type-${type.toLowerCase()}`}>{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Experience Level</h3>
                  <div className="space-y-2">
                    {["Entry Level", "Mid Level", "Senior Level", "Director", "Executive"].map((level) => (
                      <div key={level} className="flex items-center space-x-2">
                        <Checkbox id={`experience-${level.toLowerCase().replace(" ", "-")}`} />
                        <Label htmlFor={`experience-${level.toLowerCase().replace(" ", "-")}`}>{level}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Salary Range</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="min-salary">Min</Label>
                      <Input id="min-salary" type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-salary">Max</Label>
                      <Input id="max-salary" type="number" placeholder="200,000+" />
                    </div>
                  </div>
                </div>

                <Button className="w-full">Apply Filters</Button>
              </CardContent>
            </Card>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Showing 1-10 of 156 jobs</p>
              </div>
              <div className="flex items-center gap-2 ">
                <Label htmlFor="sort-by" className="text-sm">
                  Sort by:
                </Label>
                <Select defaultValue="relevance">
                  <SelectTrigger id="sort-by" className="w-[180px]">
                    <SelectValue placeholder="Relevance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="date-desc">Newest</SelectItem>
                    <SelectItem value="date-asc">Oldest</SelectItem>
                    <SelectItem value="salary-desc">Highest Salary</SelectItem>
                    <SelectItem value="salary-asc">Lowest Salary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <Card key={i} >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">Senior Frontend Developer</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Building2 className="h-4 w-4" />
                          <span>Tech Company {i + 1}</span>
                          <span className="text-muted-foreground">•</span>
                          <MapPin className="h-4 w-4" />
                          <span>{i % 3 === 0 ? "Remote" : `New York, NY${i % 2 === 0 ? " (Hybrid)" : ""}`}</span>
                        </CardDescription>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Posted {i + 1} day{i !== 0 ? "s" : ""} ago
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <div className="rounded-full bg-secondary px-3 py-1 text-xs">Full-time</div>
                        <div className="rounded-full bg-secondary px-3 py-1 text-xs">
                          {i % 3 === 0 ? "Remote" : i % 2 === 0 ? "Hybrid" : "On-site"}
                        </div>
                        <div className="rounded-full bg-secondary px-3 py-1 text-xs">
                          {i % 5 === 0 ? "Entry Level" : i % 3 === 0 ? "Mid Level" : "Senior Level"}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        We are looking for an experienced Frontend Developer to join our team. You will be responsible
                        for building and maintaining user interfaces for our web applications.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {["React", "TypeScript", "Next.js", "Tailwind CSS", "UI/UX"].map((skill, index) => (
                          <div key={index} className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center border-t pt-4">
                    <div className="font-medium">
                      ${80 + i * 5}k - ${120 + i * 5}k
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button onClick={() => setOpenJobId(i + 1)}>Apply Now</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Apply for Senior Frontend Developer</DialogTitle>
                          <DialogDescription>
                            Tech Company {i + 1} •{" "}
                            {i % 3 === 0 ? "Remote" : `New York, NY${i % 2 === 0 ? " (Hybrid)" : ""}`}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="about-yourself">Tell us about yourself</Label>
                            <Textarea
                              id="about-yourself"
                              placeholder="Briefly describe why you're a good fit for this position..."
                              className="min-h-[100px]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="experience">Relevant experience</Label>
                            <Textarea
                              id="experience"
                              placeholder="Describe your experience with the required skills and technologies..."
                              className="min-h-[100px]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="resume">Upload Resume</Label>
                            <Input id="resume" type="file" />
                            <p className="text-xs text-muted-foreground mt-1">
                              Accepted formats: PDF, DOCX, RTF (Max 5MB)
                            </p>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Submit Application</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="flex justify-center">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" disabled>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </Button>
                <Button variant="outline" className="h-9 w-9">
                  1
                </Button>
                <Button variant="outline" className="h-9 w-9">
                  2
                </Button>
                <Button variant="outline" className="h-9 w-9">
                  3
                </Button>
                <span>...</span>
                <Button variant="outline" className="h-9 w-9">
                  15
                </Button>
                <Button variant="outline" size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Button>
              </div>
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

