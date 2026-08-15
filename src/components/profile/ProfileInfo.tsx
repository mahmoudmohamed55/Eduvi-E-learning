import { BadgeCheck, CalendarDays, Phone } from "lucide-react";

type ProfileInfoProps = {
  fullName: string;
  role: string;
  phone: string;
  createdAt: string;
};

const ProfileInfo = ({
  fullName,
  role,
  phone,
  createdAt,
}: ProfileInfoProps) => {
  return (
    <div className="space-y-6">
  
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          {fullName}
        </h2>

        <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1 text-sm font-medium capitalize text-violet-700">
          <BadgeCheck size={16} />
          {role}
        </span>
      </div>

      <div className="divide-y rounded-2xl border border-gray-100">
       
        <div className="flex items-center gap-4 p-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
            <CalendarDays size={20} />
          </div>

          <div>
            <p className="text-sm text-gray-500">Join Date</p>

            <p className="font-medium text-gray-900">
              {new Date(createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-4 p-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
            <Phone size={20} />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Phone Number
            </p>

            <p className="font-medium text-gray-900">
              {phone || "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;