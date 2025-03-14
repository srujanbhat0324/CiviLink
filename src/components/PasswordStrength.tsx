
import React from 'react';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

interface PasswordRequirementProps {
  label: string;
  isMet: boolean;
}

const PasswordRequirement: React.FC<PasswordRequirementProps> = ({ label, isMet }) => {
  return (
    <div className={cn(
      "flex items-center gap-2 text-xs transition-all duration-200",
      isMet ? "text-civilink-green" : "text-muted-foreground"
    )}>
      {isMet ? (
        <Check className="h-3.5 w-3.5" />
      ) : (
        <X className="h-3.5 w-3.5" />
      )}
      <span>{label}</span>
    </div>
  );
};

interface PasswordStrengthProps {
  password: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
  const hasMinLength = password.length >= 8;
  
  const requirements = [
    { label: "At least 8 characters", isMet: hasMinLength },
    { label: "At least 1 uppercase letter", isMet: hasUppercase },
    { label: "At least 1 lowercase letter", isMet: hasLowercase },
    { label: "At least 1 digit", isMet: hasDigit },
    { label: "At least 1 special character", isMet: hasSpecialChar },
  ];
  
  const metCount = requirements.filter(req => req.isMet).length;
  const strengthPercentage = (metCount / requirements.length) * 100;
  
  let strengthColor = "bg-civilink-red";
  let strengthText = "Weak";
  
  if (strengthPercentage === 100) {
    strengthColor = "bg-civilink-green";
    strengthText = "Strong";
  } else if (strengthPercentage >= 60) {
    strengthColor = "bg-civilink-blue";
    strengthText = "Good";
  } else if (strengthPercentage >= 40) {
    strengthColor = "bg-yellow-500";
    strengthText = "Fair";
  }
  
  return (
    <div className={cn(
      "space-y-3 transition-all duration-300",
      password ? "opacity-100" : "opacity-0"
    )}>
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Password strength:</span>
          <span className={cn(
            "text-xs font-medium",
            strengthText === "Strong" ? "text-civilink-green" :
            strengthText === "Good" ? "text-civilink-blue" :
            strengthText === "Fair" ? "text-yellow-500" : "text-civilink-red"
          )}>
            {password ? strengthText : ""}
          </span>
        </div>
        <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
          <div 
            className={cn("h-full transition-all duration-300", strengthColor)}
            style={{ width: `${strengthPercentage}%` }}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {requirements.map((requirement, index) => (
          <PasswordRequirement 
            key={index}
            label={requirement.label}
            isMet={requirement.isMet}
          />
        ))}
      </div>
    </div>
  );
};

export default PasswordStrength;
