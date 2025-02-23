'use client';

import * as React from 'react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

export function MainNav() {
  return (
    <NavigationMenu className='gap-x-5 pl-5'>
      <Image src='/logo.svg' alt='Writer Blocks' width={32} height={32} />
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
          <NavigationMenuContent className='bg-gray-900'>
            <ul className='grid w-[300px] gap-3 p-4 md:w-[500px] lg:grid-cols-[.75fr_1fr]'>
              <li className='row-span-3'>
                <NavigationMenuLink asChild>
                  <Link
                    className='bg-prussianBlue flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md'
                    href='/'
                  >
                    <Image
                      src='/logo.svg'
                      alt='Writer Blocks'
                      width={32}
                      height={32}
                    />
                    <div className='text-platinum mb-2 mt-4 text-lg font-medium'>
                      Writer Blocks
                    </div>
                    <p className='text-muted-foreground text-platinum text-sm leading-tight'>
                      Tools to help you write better.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href='/lexicon-switch' title='Lexicon Switch'>
                Find surprising word alternatives.
              </ListItem>
              <ListItem href='/check-grammar' title='Check grammar'>
                Fix grammar and improve writing.
              </ListItem>
              <ListItem href='/contact' title='Contact'>
                Get in touch with our team.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'bg-accent hover:bg-butterscotch hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors',
            className,
          )}
          {...props}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug'>{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
