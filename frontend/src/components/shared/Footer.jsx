import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";

const PremiumFooter = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const socialLinks = [
    {
      icon: Facebook,
      href: "#",
      label: "Facebook",
      color: "hover:text-blue-400",
    },
    {
      icon: Twitter,
      href: "#",
      label: "Twitter",
      color: "hover:text-sky-400",
    },
    {
      icon: Linkedin,
      href: "#",
      label: "LinkedIn",
      color: "hover:text-indigo-400",
    },
    {
      icon: Mail,
      href: "#",
      label: "Email",
      color: "hover:text-purple-400",
    },
  ];

  const quickLinks = [
    { label: "Browse Jobs", href: "/" },
    { label: "Companies", href: "/" },
    { label: "Post a Job", href: "/" },
    { label: "Career Tips", href: "/" },
  ];

  const footerLinks = [
    { label: "Privacy Policy", href: "/" },
    { label: "Terms", href: "/" },
    { label: "Contact", href: "/" },
  ];

  return (
    <footer className="backdrop-blur-xl bg-gradient-to-b from-slate-900/80 via-slate-950/80 to-slate-950/80 border-t border-white/10 mt-16 relative">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* TOP SECTION */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* BRAND */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold">
              <span className="text-slate-100">Job</span>
              <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                Portal
              </span>
            </h2>

            <p className="text-sm text-slate-400 mt-4 leading-relaxed max-w-sm">
              Find global opportunities, connect with top companies,
              and build your career faster with JobPortal.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 transition-colors ${social.color}`}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* QUICK LINKS */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-slate-100 mb-4 text-lg">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-500 group-hover:w-3 transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* COMPANY */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-slate-100 mb-4 text-lg">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-sm text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-500 group-hover:w-3 transition-all duration-300"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-sm text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-500 group-hover:w-3 transition-all duration-300"></span>
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-sm text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-500 group-hover:w-3 transition-all duration-300"></span>
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-sm text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-500 group-hover:w-3 transition-all duration-300"></span>
                  Press
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* NEWSLETTER */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-slate-100 mb-4 text-lg">
              Stay Updated
            </h3>

            <p className="text-sm text-slate-400 mb-4">
              Get the latest job opportunities delivered to your inbox.
            </p>

            <div className="relative group">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg transition-all"
              >
                <Mail size={16} />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* DIVIDER */}
        <motion.div
          className="border-t border-white/10 my-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        ></motion.div>

        {/* BOTTOM SECTION */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p
            variants={itemVariants}
            className="text-center md:text-left text-slate-400"
          >
            © {new Date().getFullYear()}{" "}
            <span className="text-slate-100 font-semibold">JobPortal</span>. All
            rights reserved. Made with ❤️ by Mustee Digital Labs.
          </motion.p>

          <motion.div
            variants={containerVariants}
            className="flex gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {footerLinks.map((link) => (
              <motion.div key={link.label} variants={itemVariants}>
                <Link
                  to={link.href}
                  className="text-slate-400 hover:text-indigo-400 transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default PremiumFooter;
