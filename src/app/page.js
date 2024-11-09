'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Leaf, CheckCircle, BarChart, Smartphone, PieChart, Users, Clock, Shield, User, VenetianMask } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import Image from 'next/image'
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import Typer from 'typer-js'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [patterns, setPatterns] = useState([])
  const typerRef = useRef(null)
  const hasTyped = useRef(false);


  const cardVariants = {
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  }

  useEffect(() => {
    setMounted(true)
    setPatterns(Array.from({ length: 30 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      rotate: `${Math.random() * 360}deg`,
      isLarge: Math.random() > 0.5
    })))
   
    if (typerRef.current && !hasTyped.current) {
      Typer(typerRef.current, 80)
        .line("Manage attendance at your fingertips")
        .pause(1000)
        .back(0);
      hasTyped.current = true;
    }

  }, [])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-green-700 to-emerald-900
 overflow-hidden">
      {/* Hero Section */}
      <main className="relative pt-10">
        {/* Geometric Patterns */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 pattern transform -translate-x-1/2 translate-y-1/2">
            <AnimatePresence>
              {mounted && patterns.map((pattern, i) => (
                <motion.div
                  key={`pattern-${i}`}
                  className="absolute"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.2, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  style={{
                    left: pattern.left,
                    top: pattern.top,
                    transform: `rotate(${pattern.rotate})`,
                  }}
                >
                  <div className={`${pattern.isLarge ? 'w-16 h-16' : 'w-12 h-12'} ${pattern.isLarge ? 'bg-emerald-600' : 'bg-emerald-800'} rounded-full filter blur-xl`} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10"> 
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <div className="flex justify-center items-center space-x-4 mb-4">
                <Leaf className="h-16 w-16 text-green-200 animate-pulse" />
                <span className="font-mono">AttendEase</span>
              </div>
              <span ref={typerRef} className="block font-serif text-emerald-100"></span>
            </h1>
            <p className="text-lg md:text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Streamline your attendance management process with our intuitive platform.
              Track, manage, and analyze attendance data effortlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button className="bg-white text-emerald-700 hover:bg-emerald-100 px-8 py-6 text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105">
                  Get Started
                </Button>
              </Link>
              <Button variant="outline" className="border-white text-black hover:bg-white hover:text-emerald-700 px-8 py-6 text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Welcome Message Section */}
        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-white/90 backdrop-blur-md shadow-2xl rounded-xl overflow-hidden">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-emerald-800 mb-4 font-mono">Welcome to AttendEase</h2>
                    <p className="text-lg text-emerald-700 mb-6 font-serif">
                      Discover a smarter way to manage attendance. Our platform offers intuitive tools and powerful analytics to streamline your attendance tracking process.
                    </p>
                    <ul className="space-y-3">
                      {['Easy to use', 'Real-time tracking', 'Comprehensive reports', 'Mobile friendly'].map((item, index) => (
                        <motion.li
                          key={index}
                          className="flex items-center text-emerald-600"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <CheckCircle className="h-5 w-5 mr-2 text-emerald-500" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-center">
                    <motion.div
                      className="w-full h-64 bg-emerald-100 rounded-lg shadow-inner flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Image
                        src="/dashboard.png"
                        alt="AttendEase Dashboard"
                        width={560}
                        height={330}
                        className="rounded-lg shadow-md"
                      />
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Powerful Features</h2>
          <p className="text-xl text-emerald-100">Discover what makes AttendEase the perfect solution for your attendance needs</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: BarChart,
              title: "Track Attendance",
              description: "Record and monitor attendance with just a few clicks."
            },
            {
              icon: Smartphone,
              title: "Mobile Friendly",
              description: "Access your attendance system from any device, anywhere."
            },
            {
              icon: PieChart,
              title: "Analytics",
              description: "Get detailed insights and reports on attendance patterns."
            },
            {
              icon: Users,
              title: "Team Management",
              description: "Easily manage multiple teams and departments."
            },
            {
              icon: Clock,
              title: "Time Tracking",
              description: "Accurate time tracking for precise attendance records."
            },
            {
              icon: Shield,
              title: "Data Security",
              description: "Your data is protected with enterprise-grade security."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate={mounted ? "visible" : "hidden"}
              whileHover="hover"
              variants={cardVariants}
              className="h-full"
            >
              <Card className="relative overflow-hidden group h-full transition-all duration-300 bg-white/95 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-2xl border border-emerald-100/20">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <motion.div
                    className="relative"
                    variants={iconVariants}
                  >
                    <div className="absolute inset-0 bg-emerald-100 rounded-full blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                    <feature.icon size={48} className="text-emerald-600 relative z-10" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mt-6 mb-3 text-emerald-800 group-hover:text-emerald-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="mb-6 text-emerald-600 group-hover:text-emerald-500 transition-colors duration-300">
                    {feature.description}
                  </p>
                  <div className="mt-auto flex items-center justify-center space-x-2 text-emerald-500 group-hover:text-emerald-400 transition-colors duration-300">
                    <span className="font-medium">Learn more</span>
                    <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
        {/* How It Works Section */}
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-emerald-100">Simple steps to revolutionize your attendance management</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: 1, title: "Sign Up", description: "Create your account in minutes" },
              { step: 2, title: "Set Up", description: "Configure your teams and schedules" },
              { step: 3, title: "Start Tracking", description: "Begin recording attendance effortlessly" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={mounted ? "visible" : "hidden"}
                variants={fadeIn}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-white text-emerald-600 flex items-center justify-center text-2xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-center text-emerald-100">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="container mx-auto px-4 py-24 relative z-10">
  <div className="text-center mb-12">
    <h2 className="text-3xl font-bold text-white mb-4">What Our Customers Say</h2>
    <p className="text-xl text-emerald-100">Hear from businesses that have transformed their attendance management</p>
  </div>
  <div className="grid md:grid-cols-2 gap-8">
    {[
      { name: "John Doe", role: "HR Manager", company: "Tech Co", image: User, quote: "AttendEase has streamlined our attendance process, saving us hours each week." },
      { name: "Jane Smith", role: "School Principal", company: "Education Center", image: VenetianMask, quote: "The analytics provided by AttendEase have helped us improve student attendance significantly." }
    ].map((testimonial, index) => (
      <motion.div
        key={index}
        initial="hidden"
        animate={mounted ? "visible" : "hidden"}
        variants={fadeIn}
        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      >
        <Card className="h-full">
          <CardContent className="p-6">
            <p className="text-emerald-700 mb-4">"{testimonial.quote}"</p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-emerald-200 mr-4 flex items-center justify-center overflow-hidden">
                <testimonial.image className="w-6 h-6 text-emerald-600" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-emerald-800">{testimonial.name}</p>
                <p className="text-sm text-emerald-600">{testimonial.role}, {testimonial.company}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    ))}
  </div>
</div>
        {/* CTA Section */}
        <div className="container mx-auto px-4 py-24 relative z-10">
          <Card className="bg-white/90 backdrop-blur-md shadow-2xl rounded-xl overflow-hidden">
            <CardContent className="p-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-emerald-800 mb-4">Ready to Simplify Your Attendance Management?</h2>
                <p className="text-xl text-emerald-700 mb-8">Join thousands of satisfied customers and start your journey with AttendEase today.</p>
                <Link href="/signup">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105">
                    Start Your Free Trial
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-emerald-800 text-white py-12">
  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-4 gap-8">
      <div>
      <h3 className="text-xl font-semibold mb-4 flex items-center">
    AttendEase 
    <span className="ml-2" aria-hidden="true">
      <Leaf className="w-5 h-5" />
    </span>
  </h3>
        <p>Simplifying attendance management for businesses worldwide.</p>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
        <ul className="space-y-2">
          <li><Link href="/features" className="hover:text-emerald-300">Features</Link></li>
          <li><Link href="/pricing" className="hover:text-emerald-300">Pricing</Link></li>
          <li><Link href="/about" className="hover:text-emerald-300">About Us</Link></li>
          <li><Link href="/contact" className="hover:text-emerald-300">Contact</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-4">Legal</h4>
        <ul className="space-y-2">
          <li><Link href="/terms" className="hover:text-emerald-300">Terms of Service</Link></li>
          <li><Link href="/privacy" className="hover:text-emerald-300">Privacy Policy</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
        <div className="flex space-x-4">
          <Link href="https://facebook.com" aria-label="Follow us on Facebook" className="hover:text-emerald-300">
            <Facebook className="w-6 h-6" />
          </Link>
          <Link href="https://twitter.com" aria-label="Follow us on Twitter" className="hover:text-emerald-300">
            <Twitter className="w-6 h-6" />
          </Link>
          <Link href="https://linkedin.com" aria-label="Connect with us on LinkedIn" className="hover:text-emerald-300">
            <Linkedin className="w-6 h-6" />
          </Link>
          <Link href="https://instagram.com" aria-label="Follow us on Instagram" className="hover:text-emerald-300">
            <Instagram className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
    <div className="mt-8 pt-8 border-t border-emerald-700 text-center">
      <p>&copy; 2024 AttendEase. All rights reserved.</p>
    </div>
  </div>
</footer>
    </div>
  )
}