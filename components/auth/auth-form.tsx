'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ROUTES } from '@/lib/constants'

type AuthFormProps = {
  mode: 'login' | 'register'
}

export function AuthForm({ mode }: AuthFormProps) {
  const isLogin = mode === 'login'

  return (
    <form
      className="mx-auto max-w-md space-y-6"
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      {!isLogin && (
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" required className="mt-2 rounded-none" autoComplete="name" />
        </div>
      )}

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          className="mt-2 rounded-none"
          autoComplete="email"
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          className="mt-2 rounded-none"
          autoComplete={isLogin ? 'current-password' : 'new-password'}
        />
      </div>

      {!isLogin && (
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            className="mt-2 rounded-none"
            autoComplete="new-password"
          />
        </div>
      )}

      <Button
        type="submit"
        className="w-full rounded-none py-6 text-[10px] uppercase tracking-[0.3em]"
      >
        {isLogin ? 'Sign In' : 'Create Account'}
      </Button>

      <p className="text-center text-sm font-light text-[oklch(0.50_0.03_55)]">
        {isLogin ? (
          <>
            New to HIRU?{' '}
            <Link href={ROUTES.register} className="underline hover:text-[oklch(0.30_0.03_50)]">
              Create an account
            </Link>
          </>
        ) : (
          <>
            Already a member?{' '}
            <Link href={ROUTES.login} className="underline hover:text-[oklch(0.30_0.03_50)]">
              Sign in
            </Link>
          </>
        )}
      </p>
    </form>
  )
}
