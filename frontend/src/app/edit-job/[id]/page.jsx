"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function page({ params }) {
    const navigate = useRouter()
    useEffect(() => {
        if (typeof window !== "undefined") {
            const user = JSON.parse(localStorage.getItem("user"))
            if (user.role !== "employer") {
                navigate.push("/")
            }
        }
    }, []);


    const [formData, setFormData] = useState({
        jobTitle: "",
        jobType: "",
        locationType: "",
        location: "",
        department: "",
        salaryMin: "",
        salaryMax: "",
        description: "",
        requirements: [],
        benefits: "",
        companyName: "",
        companyWebsite: "",
        companyDescription: "",
        applicationDeadline: "",
    })
    const [loading, setLoading] = useState(false)

    const func = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/job/${params.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            })
            const data = await response.json()
            if (response.ok) {
                setFormData({
                    ...data.job,
                    requirements: data.job.requirements.join(", ")
                })
            } else {
                toast.error(data.message || "Failed to fetch job details")
            }
        } catch (err) {
            toast.error(err.message || "An error occurred while fetching job details")
        }
    }

    useEffect(() => {
        func()
    }, [params?.id])

    const handleChange = (e) => {
        const { id, value } = e.target
        setFormData((prev) => ({ ...prev, [id]: value }))
    }

    const handleSelectChange = (id, value) => {
        setFormData((prev) => ({ ...prev, [id]: value }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const formattedData = {
                ...formData,
                requirements: formData?.requirements
                    .split(',')
                    .map(skill => skill.trim())
                    .filter(skill => skill.length > 0)
            };
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/job/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(formattedData),
            })
            const data = await response.json()
            if (response.ok) {
                toast.success("Job Edited successfully")
                navigate.push("/employee")
            } else {
                toast.error(data.message || "Failed to edit job")
            }
        }
        catch (err) {
            console.error(err.message)
            toast.error("An error occurred while editing the job")
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 container py-8 px-4 md:px-6">
                <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="space-y-2 mb-8">
                        <h1 className="text-3xl font-bold">Edit Job</h1>
                    </div>

                    {/* Job Details */}
                    <div className="space-y-4 p-6 border rounded-lg">
                        <h2 className="text-xl font-semibold">Job Details</h2>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="jobTitle">Job Title</Label>
                                <Input id="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="e.g. Senior Frontend Developer" required />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Job Type</Label>
                                    <Select onValueChange={(val) => handleSelectChange("jobType", val)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select job type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="full-time">Full-time</SelectItem>
                                            <SelectItem value="part-time">Part-time</SelectItem>
                                            <SelectItem value="contract">Contract</SelectItem>
                                            <SelectItem value="freelance">Freelance</SelectItem>
                                            <SelectItem value="internship">Internship</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Location Type</Label>
                                    <Select onValueChange={(val) => handleSelectChange("locationType", val)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select location type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="remote">Remote</SelectItem>
                                            <SelectItem value="on-site">On-site</SelectItem>
                                            <SelectItem value="hybrid">Hybrid</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input id="location" value={formData.location} onChange={handleChange} placeholder="e.g. New York, NY" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="department">Department</Label>
                                    <Input id="department" value={formData.department} onChange={handleChange} placeholder="e.g. Engineering" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="salaryMin">Minimum Salary</Label>
                                    <Input id="salaryMin" value={formData.salaryMin} onChange={handleChange} placeholder="e.g. 50000" type="number" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="salaryMax">Maximum Salary</Label>
                                    <Input id="salaryMax" value={formData.salaryMax} onChange={handleChange} placeholder="e.g. 80000" type="number" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Job Description */}
                    <div className="space-y-4 p-6 border rounded-lg">
                        <h2 className="text-xl font-semibold">Job Description</h2>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" value={formData.description} onChange={handleChange} placeholder="Provide a detailed job description" className="min-h-[200px]" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="requirements">Skills Requirements</Label>
                            <Textarea
                                id="requirements"
                                value={formData.requirements}
                                onChange={handleChange}
                                placeholder="e.g. JavaScript, React, Node.js"
                                className="min-h-[150px]"
                            />

                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="benefits">Benefits</Label>
                            <Textarea id="benefits" value={formData.benefits} onChange={handleChange} placeholder="Describe perks offered" className="min-h-[150px]" />
                        </div>
                    </div>

                    {/* Company Info */}
                    <div className="space-y-4 p-6 border rounded-lg">
                        <h2 className="text-xl font-semibold">Company Information</h2>
                        <div className="space-y-2">
                            <Label htmlFor="companyName">Company Name</Label>
                            <Input id="companyName" value={formData.companyName} onChange={handleChange} placeholder="e.g. Acme Inc." required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="companyWebsite">Company Website</Label>
                            <Input id="companyWebsite" value={formData.companyWebsite} onChange={handleChange} placeholder="https://www.acme.com" type="url" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="companyDescription">Company Description</Label>
                            <Textarea id="companyDescription" value={formData.companyDescription} onChange={handleChange} placeholder="Brief description" className="min-h-[100px]" />
                        </div>
                    </div>

                    {/* Application Settings */}
                    <div className="space-y-4 p-6 border rounded-lg">
                        <h2 className="text-xl font-semibold">Application Settings</h2>
                        <div className="space-y-2">
                            <Label htmlFor="applicationDeadline">Application Deadline</Label>
                            <Input id="applicationDeadline" value={formData.applicationDeadline} onChange={handleChange} type="date" />
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end gap-4">
                        <Button type="submit">Publish Job</Button>
                    </div>
                </form>
            </main>

            <footer className="border-t">
                <div className="container py-4 px-4 md:px-6 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} JobConnect. All rights reserved.
                </div>
            </footer>
        </div>
    )
}
