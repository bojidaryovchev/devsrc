import React from "react";

const StatsSection: React.FC = () => {
  return (
    <>
      <div className="border-border mt-12 border-t pt-12">
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          <div>
            <div className="mb-2 bg-linear-to-r from-(--indigo-600) to-(--purple-400) bg-clip-text text-4xl font-bold text-transparent">
              500+
            </div>

            <div className="text-muted-foreground text-sm">Happy Clients</div>
          </div>

          <div>
            <div className="mb-2 bg-linear-to-r from-(--purple-400) to-(--blue-500) bg-clip-text text-4xl font-bold text-transparent">
              98%
            </div>

            <div className="text-muted-foreground text-sm">Satisfaction Rate</div>
          </div>

          <div>
            <div className="mb-2 bg-linear-to-r from-(--blue-500) to-(--cyan-500) bg-clip-text text-4xl font-bold text-transparent">
              4.9/5
            </div>

            <div className="text-muted-foreground text-sm">Average Rating</div>
          </div>

          <div>
            <div className="mb-2 bg-linear-to-r from-(--cyan-500) to-(--indigo-600) bg-clip-text text-4xl font-bold text-transparent">
              10+
            </div>

            <div className="text-muted-foreground text-sm">Years Experience</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsSection;
