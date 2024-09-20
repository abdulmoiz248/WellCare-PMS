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

export default function DoctorForm() {
  // States for form inputs
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [specialization, setSpecialization] = useState<string>("");
  const [licenseNumber, setLicenseNumber] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [gender, setGender] = useState<string>("");
  const [qualifications, setQualifications] = useState<string[]>([]);
  const [availableSlots, setAvailableSlots] = useState<{ day: string; time: string }[]>([]);
  const [progress, setProgress] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
  
    if (!name || !lastName || !specialization || !licenseNumber || !phoneNumber || !address || !dateOfBirth || !gender) {
      alert("Please fill in all required fields.");
      return;
    }
  
    

  
   
    console.log("Form Data:");
    console.log({
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
    });

  
  };
  

  // Add or update qualifications and available slots
  const addQualification = () => setQualifications([...qualifications, ""]);
  const updateQualification = (index: number, value: string) => {
    const updatedQualifications = [...qualifications];
    updatedQualifications[index] = value;
    setQualifications(updatedQualifications);
  };
  const removeQualification = (index: number) => {
    setQualifications(qualifications.filter((_, i) => i !== index));
  };

  const addAvailableSlot = () => setAvailableSlots([...availableSlots, { day: "", time: "" }]);
  const updateAvailableSlot = (index: number, field: "day" | "time", value: string) => {
    const updatedSlots = [...availableSlots];
    updatedSlots[index][field] = value;
    setAvailableSlots(updatedSlots);
  };
  const removeAvailableSlot = (index: number) => {
    setAvailableSlots(availableSlots.filter((_, i) => i !== index));
  };

  // Update progress based on the filled fields
  useEffect(() => {
    const totalFields = 7 + qualifications.length + availableSlots.length * 2; // Adjust the number of fields
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
      ...availableSlots.flatMap((slot) => [slot.day, slot.time]).filter((v) => v !== "")
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.form
        initial="hidden"
        animate="visible"
        className="space-y-8 w-full max-w-4xl p-8 bg-white rounded-xl shadow-2xl relative overflow-hidden"
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

        <motion.div variants={staggerAnimation} custom={5} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${!dateOfBirth && "text-muted-foreground"}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateOfBirth ? format(dateOfBirth, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={dateOfBirth} onSelect={setDateOfBirth} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Select value={gender} onValueChange={(value) => setGender(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        <motion.div variants={staggerAnimation} custom={6} className="space-y-4">
          {qualifications.map((qualification, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Input
                value={qualification}
                onChange={(e) => updateQualification(index, e.target.value)}
                placeholder="Enter qualification"
                className="flex-grow"
              />
              <Button type="button" variant="ghost" size="icon" onClick={() => removeQualification(index)}>
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
          <Button type="button" variant="outline" onClick={addQualification} className="w-full">
            <PlusCircle className="h-4 w-4 mr-2" /> Add Qualification
          </Button>
        </motion.div>

        <motion.div variants={staggerAnimation} custom={7} className="space-y-4">
          {availableSlots.map((slot, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Input
                value={slot.day}
                onChange={(e) => updateAvailableSlot(index, "day", e.target.value)}
                placeholder="Enter day"
                className="flex-grow"
              />
              <Input
                value={slot.time}
                onChange={(e) => updateAvailableSlot(index, "time", e.target.value)}
                placeholder="Enter time"
                className="flex-grow"
              />
              <Button type="button" variant="ghost" size="icon" onClick={() => removeAvailableSlot(index)}>
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
          <Button type="button" variant="outline" onClick={addAvailableSlot} className="w-full">
            <PlusCircle className="h-4 w-4 mr-2" /> Add Available Slot
          </Button>
        </motion.div>

        <motion.div variants={staggerAnimation} custom={8} className="flex justify-end">
          <Button type="submit">
            <CheckCircle2 className="mr-2 h-4 w-4" /> Submit
          </Button>
        </motion.div>
      </motion.form>
    </div>
  );
}
