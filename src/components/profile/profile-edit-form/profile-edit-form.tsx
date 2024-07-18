import { useForm } from "react-hook-form";
import { UseSubmitProfileProps, useCommunes, useSubmitProfile, useWilayas } from "/src/api/api-client-hooks";
import { useEffect, useState } from "react";
import { useAuth } from "/src/api/auth-context";

export interface ProfileEditFormProps {
    classname?: string;
}

export interface ProfileEditFormInputs {
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    homeAddress: string,
    wilaya: string,
    commune: number,
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
}

export const ProfileEditForm = ({classname}: ProfileEditFormProps) => {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ProfileEditFormInputs>();
    const { wilayas, loading: wilayasLoading, error: wilayasError } = useWilayas();
    const { userProfile } = useAuth();
    const [ selectedWilaya, setSelectedWilaya ] = useState<string>('');
    const [ selectedWilayaCode, setSelectedWilayaCode ] = useState<string>('');
    const [ selectedCommuneId, setSelectedCommuneId ] = useState<number>();
    const { communes, loading: communesLoading, error: communesError } = useCommunes(selectedWilayaCode);
    const { submitProfile, loading, error } = useSubmitProfile();

    const onSubmit = (data: UseSubmitProfileProps) => {
        // Handle form submission
        console.log('Profile update data:', data);
        submitProfile(data);
    };

    const currentPassword = watch('currentPassword');
    const newPassword = watch('newPassword');
    const confirmPassword = watch('confirmPassword');

    useEffect(() => {
        if(userProfile){
            setValue('email', userProfile.email ?? '');
            setValue('firstName', userProfile.customerDto?.firstName ?? '');
            setValue('lastName', userProfile.customerDto?.lastName ?? '');
            setValue('phoneNumber', userProfile.customerDto?.phoneNumber ?? '');
            setValue('homeAddress', userProfile.customerDto?.addressDto?.homeAddress ?? '');
            setSelectedWilaya(userProfile.customerDto?.addressDto?.algeriaCityDto?.wilayaNameAscii ?? '');
            setSelectedWilayaCode(userProfile.customerDto?.addressDto?.algeriaCityDto?.wilayaCode ?? '');
            setSelectedCommuneId(userProfile.customerDto?.addressDto?.algeriaCityDto?.id ?? 0);
        }
    }, [userProfile]);

    const handleWilayaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCode = event.target.value;
        const selectedName = event.target.options[event.target.selectedIndex].text;
        console.log(selectedCode);
        console.log(selectedName);
        setSelectedWilayaCode(selectedCode);
        setSelectedWilaya(selectedName);
        setValue('commune', 0); // Reset commune selection if needed
    };

    const handleCommuneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = parseInt(event.target.value, 10);
        setSelectedCommuneId(selectedId);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    {...register('email', { required: 'Email is required' })}
                    type="email"
                />
                {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
                <label htmlFor="firstName">First name</label>
                <input
                    id="firstName"
                    {...register('firstName', { required: 'First name is required' })}
                />
                {errors.firstName && <p>{errors.firstName.message}</p>}
            </div>
            <div>
                <label htmlFor="lastName">Last name</label>
                <input
                    id="lastName"
                    {...register('lastName', { required: 'Last name is required' })}
                />
                {errors.lastName && <p>{errors.lastName.message}</p>}
            </div>
            <div>
                <label htmlFor="phoneNumber">Phone number</label>
                <input
                    id="phoneNumber"
                    {...register('phoneNumber', { required: 'Phone number is required' })}
                    type="tel"
                />
                {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
            </div>
            <div>
                <label htmlFor="homeAddress">Home address</label>
                <input
                    id="homeAddress"
                    {...register('homeAddress', { required: 'Home address is required' })}
                />
                {errors.homeAddress && <p>{errors.homeAddress.message}</p>}
            </div>
            <div>
                <label htmlFor="wilaya">Wilaya</label>
                <select
                    id="wilaya"
                    {...register('wilaya', { required: 'Wilaya is required' })}
                    value={selectedWilayaCode} onChange={handleWilayaChange}
                >
                    <option value="">Select a wilaya</option>
                    {wilayas.map((wilaya) => (
                        <option key={wilaya.wilayaCode} value={wilaya.wilayaCode}>
                            {wilaya.wilayaNameAscii}
                        </option>
                    ))}
                </select>
                {errors.wilaya && <p>{errors.wilaya.message}</p>}
            </div>
            <div>
                <label htmlFor="commune">Commune</label>
                <select
                    id="commune"
                    {...register('commune', { required: 'Commune is required' })}
                    disabled={!selectedWilayaCode} value={selectedCommuneId} onChange={handleCommuneChange}
                >
                    <option value="">Select a commune</option>
                    {communes.map((commune) => (
                        <option key={commune.id} value={commune.id}>
                            {commune.communeNameAscii}
                        </option>
                    ))}
                </select>
                {errors.commune && <p>{errors.commune.message}</p>}
            </div>
            <div>
                <label htmlFor="currentPassword">Current Password</label>
                <input
                    id="currentPassword"
                    {...register('currentPassword', {
                        validate: value => (!value && !newPassword && !confirmPassword) || value.length > 0 || 'Current password is required'
                    })}
                    type="password"
                />
                {errors.currentPassword && <p>{errors.currentPassword.message}</p>}
            </div>
            <div>
                <label htmlFor="newPassword">New Password</label>
                <input
                    id="newPassword"
                    {...register('newPassword', {
                        validate: value => (!value && !currentPassword && !confirmPassword) || value.length > 0 || 'New password is required'
                    })}
                    type="password"
                />
                {errors.newPassword && <p>{errors.newPassword.message}</p>}
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    id="confirmPassword"
                    {...register('confirmPassword', {
                        validate: value => (!value && !currentPassword && !newPassword) || value === newPassword || 'The passwords do not match'
                    })}
                    type="password"
                />
                {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
            </div>
            <button type="submit" >Save Changes</button>
        </form>
    );
}