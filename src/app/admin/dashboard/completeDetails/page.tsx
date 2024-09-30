"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { CalendarIcon, PlusCircle, X, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";

import { useRouter } from "next/navigation";
import Loaders from "@/components/Loaders";
import axios from "axios";

// Function to generate time options
const generateTimeOptions = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    times.push(`${hour.toString().padStart(2, "0")}:00`);
    times.push(`${hour.toString().padStart(2, "0")}:30`);
  }
  return times;
};

// Reusable time select component
function TimeSelect({ value, onChange, placeholder }: { value: string, onChange: (value: string) => void, placeholder: string }) {
  const timeOptions = generateTimeOptions();
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {timeOptions.map((time: string, index: number) => (
          <SelectItem key={index} value={time}>
            {time}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default function DoctorForm() {
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [specialization, setSpecialization] = useState<string>("");
  const [licenseNumber, setLicenseNumber] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [gender, setGender] = useState<string>("");
  const [qualifications, setQualifications] = useState<string[]>([]);
  const [availableSlots, setAvailableSlots] = useState<{ day: string; from: string; to: string }[]>([]);
  const [progress, setProgress] = useState(0);
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  // Fetch doctor email securely
  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        const cookieValue = parts.pop()?.split(';').shift();
        return cookieValue ? decodeURIComponent(cookieValue) : null;
      }
      return null;
    };

    const doctorEmail = getCookie('doctor-register');
    
    if (doctorEmail) {
      setEmail(doctorEmail);
      setIsLoading(false);
    } else {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validate form fields
    if (!name || !lastName || !specialization || !licenseNumber || !phoneNumber || !address || !dateOfBirth || !gender) {
      alert("Please fill in all required fields.");
      return;
    }
    const emptyQualifications = qualifications.some(qualification => !qualification);
    if (emptyQualifications || qualifications.length === 0) {
      alert("Please fill in all required qualifications.");
      return;
    }

    const incompleteSlots = availableSlots.some(slot => !slot.day || !slot.from || !slot.to);
    if (incompleteSlots || availableSlots.length === 0) {
      alert("Please fill in all required slots.");
      return;
    }

    const formData = {
      email,
      name,
      lastName,
      specialization,
      licenseNumber,
      phoneNumber,
      address,
      dateOfBirth: dateOfBirth ? format(dateOfBirth, "PPP") : null,
      gender,
      qualifications,
      availableSlots,
    };

    try {
      // Post securely with CSRF tokens and input sanitization (assumed handled by the backend)
      let res = await axios.post("/api/admin/complete-details", formData);
      console.log(res.data);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const addQualification = () => setQualifications([...qualifications, ""]);
  const updateQualification = (index: number, value: string) => {
    const updatedQualifications = [...qualifications];
    updatedQualifications[index] = value;
    setQualifications(updatedQualifications);
  };
  const removeQualification = (index: number) => {
    setQualifications(qualifications.filter((_, i) => i !== index));
  };

  const addAvailableSlot = () => setAvailableSlots([...availableSlots, { day: "", from: "", to: "" }]);
  const updateAvailableSlot = (index: number, field: "day" | "from" | "to", value: string) => {
    const updatedSlots = [...availableSlots];
    updatedSlots[index][field] = value;
    setAvailableSlots(updatedSlots);
  };
  const removeAvailableSlot = (index: number) => {
    setAvailableSlots(availableSlots.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const totalFields = 7 + qualifications.length + availableSlots.length * 3;
    const filledFields = [
      name,
      lastName,
      specialization,
      licenseNumber,
      phoneNumber,
      address,
      dateOfBirth,
      gender,
      ...qualifications.filter((q) => q !== ""),
      ...availableSlots.flatMap((slot) => [slot.day, slot.from, slot.to]).filter((v) => v !== "")
    ].filter(Boolean).length;
    
    const progressPercentage = (filledFields / totalFields) * 100;
    setProgress(progressPercentage);
  }, [name, lastName, specialization, licenseNumber, phoneNumber, address, dateOfBirth, gender, qualifications, availableSlots]);

  const staggerAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    isLoading ? <Loaders /> : (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <motion.form
          initial="hidden"
          animate="visible"
          className="space-y-8 w-full max-w-4xl p-8 bg-white rounded-xl shadow-2xl relative overflow-hidden"
          onSubmit={handleSubmit}
        >
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] -z-10" />
          <motion.div variants={staggerAnimation} custom={0}>
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Complete Doctor Details</h2>
            <Progress value={progress} className="mb-4" />
          </motion.div>

          <motion.div variants={staggerAnimation} custom={1} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="pt-4" />
            <Input id="lastName" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="pt-4" />
          </motion.div>

          <motion.div variants={staggerAnimation} custom={2}>
            <Input id="specialization" placeholder="Specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} className="pt-4" />
          </motion.div>

          <motion.div variants={staggerAnimation} custom={3} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input id="licenseNumber" placeholder="License Number" value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} className="pt-4" />
            <Input id="phoneNumber" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="pt-4" />
          </motion.div>

          <motion.div variants={staggerAnimation} custom={4}>
            <Input id="address" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="pt-4" />
          </motion.div>

          <motion.div variants={staggerAnimation} custom={5}>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  {dateOfBirth ? format(dateOfBirth, "PPP") : <span>Select Birth Date</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={dateOfBirth} onSelect={setDateOfBirth} initialFocus />
              </PopoverContent>
            </Popover>
          </motion.div>

          <motion.div variants={staggerAnimation} custom={6}>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger>
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div variants={staggerAnimation} custom={7} className="space-y-6">
            {qualifications.map((qualification, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Input placeholder="Qualification" value={qualification} onChange={(e) => updateQualification(index, e.target.value)} />
                <Button type="button" variant="ghost" size="icon" onClick={() => removeQualification(index)}>
                  <X />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addQualification} className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Qualification
            </Button>
          </motion.div>

          <motion.div variants={staggerAnimation} custom={8} className="space-y-6">
            {availableSlots.map((slot, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select value={slot.day} onValueChange={(value) => updateAvailableSlot(index, "day", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Monday">Monday</SelectItem>
                    <SelectItem value="Tuesday">Tuesday</SelectItem>
                    <SelectItem value="Wednesday">Wednesday</SelectItem>
                    <SelectItem value="Thursday">Thursday</SelectItem>
                    <SelectItem value="Friday">Friday</SelectItem>
                    <SelectItem value="Saturday">Saturday</SelectItem>
                    <SelectItem value="Sunday">Sunday</SelectItem>
                  </SelectContent>
                </Select>
                <TimeSelect
                  value={slot.from}
                  onChange={(value) => updateAvailableSlot(index, "from", value)}
                  placeholder="From"
                />
                <TimeSelect
                  value={slot.to}
                  onChange={(value) => updateAvailableSlot(index, "to", value)}
                  placeholder="To"
                />
                <Button type="button" variant="ghost" size="icon" onClick={() => removeAvailableSlot(index)}>
                  <X />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addAvailableSlot} className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Available Slot
            </Button>
          </motion.div>

          <motion.div variants={staggerAnimation} custom={9}>
            <Button type="submit" className="w-full">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Submit
            </Button>
          </motion.div>
        </motion.form>
      </div>
    )
  );
}
