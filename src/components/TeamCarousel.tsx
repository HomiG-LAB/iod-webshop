"use client";

import React, { useState, useEffect, useRef } from "react";
import { client } from "../sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

const builder = createImageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

interface TeamMember {
  _id?: string;
  id?: string;
  name: string;
  role: string;
  image: any;
  description?: string;
}

export default function TeamCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await client.fetch(`*[_type == "teamMember"] | order(order asc)`);
        if (data && data.length > 0) {
          setTeamMembers(data);
        } else {
          // Fallback to mock data if Sanity is empty
          const { teamData } = await import("../data/mockData");
          // @ts-ignore
          setTeamMembers(teamData.members);
        }
      } catch (error) {
        console.error("Failed to fetch team members:", error);
        const { teamData } = await import("../data/mockData");
        // @ts-ignore
        setTeamMembers(teamData.members);
      }
    };
    fetchTeam();
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    if (isHovered || selectedMember) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        // If reached the end, scroll back to start, else scroll right
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollContainerRef.current.scrollBy({ left: 320, behavior: "smooth" }); // approximate card width
        }
      }
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(interval);
  }, [isHovered, selectedMember]);

  // Handle escape key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedMember(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar scroll-smooth"
        >
          {teamMembers.map((member) => (
            <div 
              key={member._id || member.id} 
              onClick={() => setSelectedMember(member)}
              className="snap-start shrink-0 w-72 sm:w-80 group relative bg-[#111316]/50 border border-white/[0.03] rounded-3xl p-6 overflow-hidden hover:border-[#c8f400]/30 transition-colors cursor-pointer"
            >
              {/* Neon Glow Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#c8f400]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="relative w-full aspect-[4/5] mb-6 rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-[#c8f400]/50 transition-colors">
                  {member.image ? (
                    <img src={typeof member.image === 'string' ? member.image : urlFor(member.image).url()} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full bg-[#161a1e] flex items-center justify-center text-white/20">No Image</div>
                  )}
                  
                  {/* Discovery Hint */}
                  <div className="absolute bottom-4 right-4 bg-[#c8f400] text-[#0a0b0d] w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-[0_0_20px_rgba(200,244,0,0.4)]">
                    <span className="material-symbols-outlined text-xl">add</span>
                  </div>
                </div>
                
                <div className="text-center mt-auto">
                  <h3 className="font-headline font-black text-2xl uppercase text-[#e8ecef] tracking-tighter mb-1">
                    {member.name}
                  </h3>
                  <p className="font-headline text-[10px] font-black uppercase tracking-widest text-[#00c8f0]">
                    {member.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Side Drawer Overlay */}
      <div 
        className={`fixed inset-0 z-[100] transition-opacity duration-300 ${selectedMember ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!selectedMember}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-[#0a0b0d]/80 backdrop-blur-sm"
          onClick={() => setSelectedMember(null)}
        />
        
        {/* Drawer Panel */}
        <div 
          className={`absolute top-0 right-0 h-full w-full max-w-md bg-[#111316] border-l border-white/5 shadow-2xl overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${selectedMember ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {selectedMember && (
            <div className="relative h-full flex flex-col">
              {/* Close Button */}
              <button 
                onClick={() => setSelectedMember(null)}
                className="absolute top-6 right-6 z-20 w-12 h-12 bg-black/50 hover:bg-[#c8f400] hover:text-black text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors border border-white/10"
                aria-label="Close"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              {/* Drawer Image Hero */}
              <div className="relative w-full aspect-square shrink-0">
                {selectedMember.image ? (
                  <img src={typeof selectedMember.image === 'string' ? selectedMember.image : urlFor(selectedMember.image).url()} alt={selectedMember.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-[#161a1e] flex items-center justify-center text-white/20">No Image</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111316] via-[#111316]/50 to-transparent" />
              </div>

              {/* Drawer Content */}
              <div className="px-8 pb-12 -mt-16 relative z-10 flex-grow">
                <div className="inline-flex items-center gap-2 bg-[#00c8f0]/10 border border-[#00c8f0]/20 text-[#00c8f0] px-3 py-1.5 rounded-full text-[10px] font-headline font-black uppercase tracking-widest mb-4">
                  {selectedMember.role}
                </div>
                
                <h2 className="font-headline font-black text-4xl uppercase text-[#e8ecef] tracking-tighter mb-6">
                  {selectedMember.name}
                </h2>
                
                <p className="text-[#8d9ba8] text-base leading-relaxed whitespace-pre-wrap">
                  {selectedMember.description}
                </p>

                <div className="mt-12 pt-8 border-t border-white/[0.05]">
                  <p className="font-headline text-[10px] font-black uppercase tracking-widest text-white/30 text-center">
                    IOD TEAM MEMBER
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
